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
		const Menu = Parse.Object.extend("Menu");
		const Chef = Parse.Object.extend("Chef");
		const User = Parse.Object.extend("User");
		const ChefSettings = Parse.Object.extend("ChefSettings");
		const Settings = Parse.Object.extend("UserSettings");

		const chef = new Chef();
		const menu = new Menu();
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