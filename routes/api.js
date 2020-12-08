const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
	let {email} = req.body;

	const User = Parse.Object.extend("User");
	const query = new Parse.Query(User);

	query.equalTo("email", email);
	query.find().then((user) => {
		res.json({msg: user});
	}, (err) => {
		res.json({msg: err, aa: 1});
	});
});

module.exports = router;