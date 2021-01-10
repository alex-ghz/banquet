const express = require('express');
const router = express.Router();

router.post('/saveData', (req, res) => {
	const { key, chefId } = req.body;

	console.log(req.body);

	if ( key === 'profileImg' ) {
		const file = req.files.file;
		const userFileName = file.name;

		const data = Array.from(Buffer.from(file.data, 'binary'));
		const parseFile = new Parse.File(userFileName, data);

		parseFile.save()
				 .then(result => {
					 const Chef = Parse.Object.extend("Chef");
					 const queryChef = new Parse.Query(Chef);

					 queryChef.get(chefId)
							  .then(chef => {
								  chef.set("profilePhotoURL", result.url());

								  chef.save()
									  .then(chef => {
										  res.json({ photoUrl: result.url() });
									  })
							  });
				 });
	}

	if ( key === 'description' ) {
		const { data } = req.body;

		const Chef = Parse.Object.extend("Chef");
		const queryChef = new Parse.Query(Chef);

		queryChef.get(chefId)
				 .then(chef => {
					 chef.set(key, data);

					 chef.save()
						 .then(chef => {
							 res.json({ done: true });
						 })
				 })
	}

});

module.exports = router;