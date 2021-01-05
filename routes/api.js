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
				const chef = new Chef();
				const user = new User();

				chef.set('name', name);
				chef.set('phoneNo', phoneNo);
				chef.set('online', false);
				chef.set('menu', menu);
				chef.set('settings', new ChefSettings());

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
								sendGeneratedUser(user, res);
							})
							.catch((err) => {
								return res.status(405).json({ msg: "User object could not be created", err: err });
							})
					})
					.catch((err) => {
						return res.status(405).json({ msg: "Chef object could not be created", err: err });
					});
			});
	}
});

router.post('/login', (req, res) => {
	let { email, password } = req.body;

	Parse.User.logIn(email, password)
		 .then((user) => {
			 sendGeneratedUser(user, res);
		 })
		 .catch((err) => {
			 return {
				 msg: err.message,
				 err: err
			 };
		 });
});

router.post('/test', (req, res) => {
	getMenu()
		.then(menu => {
			res.json({ data: menu });
		})
})

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
		user: user,
		settings: null,
		chef: null
	};

	const Chef = Parse.Object.extend('Chef');
	const queryChef = new Parse.Query(Chef);

	queryChef.equalTo('objectId', user.user.attributes.chef.id);

	queryChef.find()
			 .then((result) => {
				 user.chef = result[0].attributes;

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

module.exports = router;