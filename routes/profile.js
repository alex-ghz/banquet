const express = require('express');
const router = express.Router();

router.post('/update', async (req, res) => {
	const { fileAdded, chefId } = req.body;

	const Chef = Parse.Object.extend("Chef");
	const queryChef = new Parse.Query(Chef);

	queryChef.get(chefId)
			 .then(chef => {
				 if ( fileAdded === 'true' ) {
					 saveChefPhoto()
						 .then(photoUrl => {
							 chef.set("profilePhotoURL", photoUrl);
							 saveChefDetails(chef, req.body, () => {
								 chef.save()
									 .then(result => {
										 res.json({ msg: "ok" });
									 })
							 });
						 });
				 } else {
					 saveChefDetails(chef, req.body, () => {
						 chef.save()
							 .then(result => {
								 res.json({ msg: "ok" });
							 })
					 });
				 }
			 });
});

router.post('/saveData', (req, res) => {
	const { key, chefId } = req.body;

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

function saveChefPhoto(file) {
	return new Promise(resolve => {
		const userFileName = file.name;

		const data = Array.from(Buffer.from(file.data, 'binary'));
		const parseFile = new Parse.File(userFileName, data);

		parseFile.save()
				 .then(result => {
					 resolve(result.url());
				 });
	});
}

function saveChefDetails(chef, body, cb) {
	console.log(body);
	const {
		description,
		delivery,
		categories,
		address,
	} = body;

	chef.set("description", description);
	chef.set("cuisineType", JSON.parse(categories));

	const deliveryObject = JSON.parse(delivery);

	chef.set("deliveryRadius", deliveryObject.deliveryRadius);
	chef.set("delivery", deliveryObject.delivery);
	chef.set("pickup", deliveryObject.pickup);

	const point = new Parse.GeoPoint({
		latitude: deliveryObject.postcode.latitude,
		longitude: deliveryObject.postcode.longitude
	});

	chef.set("location", point);
	chef.set("postcode", deliveryObject.postcode.value);
	chef.set("address", address);

	cb();
}

module.exports = router;