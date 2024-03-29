const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
	let { email, name, phoneNo, password } = req.body;

	const User = Parse.Object.extend("User");
	const query = new Parse.Query(User);

	query.equalTo("email", email);

	const userExists = await query.count();

	if ( userExists ) {
		return res.status(405).json({ msg: "User with this email already exists!" });
	} else {
		const Chef = Parse.Object.extend("Chef");
		const User = Parse.Object.extend("User");
		const ChefSettings = Parse.Object.extend("ChefSettings");
		const Settings = Parse.Object.extend("UserSettings");

		getMenu()
			.then(menu => {
				const settings = new ChefSettings();

				settings.set("commission", 4.95);
				settings.save()
						.then(settings => {
							const chef = new Chef();
							const user = new User();

							chef.set('name', name);
							chef.set('phoneNo', phoneNo);
							chef.set('online', false);
							chef.set('menu', menu);
							chef.set('settings', settings);

							chef.save()
								.then((chef) => {
									user.set('chef', chef);
									user.set('updatedAt', new Date());
									user.set('activated', false);
									user.set('username', email);
									user.set('createdAt', new Date());
									user.set('password', password);
									user.set('email', email);
									user.set('settings', new Settings());

									user.save()
										.then((user) => {
											sendGeneratedUser({ user: user, newUser: true }, res);
										})
										.catch((err) => {
											return res.status(405).json({
												msg: "User object could not be created",
												err: err
											});
										})
								})
								.catch((err) => {
									return res.status(405).json({ msg: "Chef object could not be created", err: err });
								});
						}).catch(err => {
					return res.status(500).json({ msg: "Something went wrong. Please retry" });
				});
			});
	}
});

router.post('/login', (req, res) => {
	let { email, password } = req.body;

	Parse.User.logIn(email, password)
		 .then((user) => {
			 const hasClientAccount = !!user.get("client");

			 if ( !hasClientAccount ) {
				 sendGeneratedUser({ user: user }, res);
			 } else {
				 return res.status(400).json({
					 msg: "Cannot login with client credentials"
				 });
			 }
		 })
		 .catch((err) => {
			 return res.status(405).json({
				 msg: err.message,
				 err: err
			 });
		 });
});

function getMenu() {
	return new Promise(resolve => {
		const Menu = Parse.Object.extend("Menu");
		const MenuCategory = Parse.Object.extend("MenuCategory");

		// create categories
		const defaultCategiries = ['mains', 'sides', 'drinks'];
		let defaultCategoriesPromises = [];

		defaultCategiries.forEach(defaultCategory => {
			defaultCategoriesPromises.push(new Promise(resolve => {
				const defCateg = new MenuCategory();

				defCateg.set('name', defaultCategory);
				defCateg.set('index', defaultCategoriesPromises.length);

				if ( defaultCategory === 'mains' ) {
					defCateg.set('primaryCategory', true);
				} else {
					defCateg.set('primaryCategory', false);
				}

				defCateg.save()
						.then(category => resolve(category));
			}));
		});

		Promise.all(defaultCategoriesPromises)
			   .then(values => {
				   const menu = new Menu();
				   const menuRelation = menu.relation('categories');

				   values.forEach(value => {
					   menuRelation.add(value);
				   });

				   menu.save()
					   .then((menu) => {
						   resolve(menu);
					   });
			   });
	});
}

function sendGeneratedUser(user, res) {
	user = {
		user: user.user,
		settings: null,
		chef: null,
		newUser: !!user.newUser
	};

	const Chef = Parse.Object.extend('Chef');
	const queryChef = new Parse.Query(Chef);

	queryChef.equalTo('objectId', user.user.attributes.chef.id);

	queryChef.find()
			 .then((result) => {
				 user.chef = result[0].attributes;

				 // const activated = user.user.get("activated");
				 //
				 // if ( !!activated === false && activated === false ) {
				 // 	return res.status(400).json({
				 // 	msg: "Thank you for creating an account with Banquet. We'll contact you shortly in order to activate your account!"
				 // });
				 // }

				 const ChefSettings = Parse.Object.extend("ChefSettings");
				 const queryChefSettings = new Parse.Query(ChefSettings);

				 queryChefSettings.equalTo('objectId', user.chef.settings.id);

				 queryChefSettings.find()
								  .then(result => result[0])
								  .then(result => {
									  user.chefSettings = result.attributes;

									  const Settings = Parse.Object.extend("UserSettings");
									  const querySettings = new Parse.Query(Settings);

									  querySettings.equalTo('objectId', user.user.attributes.settings.id);

									  querySettings.find()
												   .then((result) => {
													   user.settings = result;

													   res.json(user);
												   });
								  });
			 });
}

router.post('/test', (req, res) => {
	const { location, delivery, pickup } = req.body;

	Parse.Cloud.run('createOrder', {
			 location: location,
			 delivery: delivery,
			 pickup: pickup
		 })
		 .then(result => {
			 res.json({ result: result });
		 })
});

module.exports = router;