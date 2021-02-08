const express = require('express');
const router = express.Router();

router.get('/stats', (req, res) => {
	const { chefId } = req.query;

	if ( !!chefId === false ) {
		return res.status(400).json({ err: "Invalid chefId" });
	}

	const Chef = Parse.Object.extend("Chef");
	const queryChef = new Parse.Query(Chef);

	queryChef.get(chefId)
			 .then(chef => {
				 const Order = Parse.Object.extend("Order");
				 const queryOrders = new Parse.Query(Order);

				 queryOrders.equalTo("chef", chef);

				 queryOrders.find()
							.then(results => {
								res.status(200).json({
									sales: results.reduce((a, b) => a + b.get("subtotal"), 0.00),
									rating: !!chef.get("rating") ? chef.get("rating") : 0,
									activeOrders: results.filter(order => !['complete', 'canceled'].includes(order.get("status"))).length,
									completedOrders: results.filter(order => order.get("status") === 'complete').length
								});
							})
							.catch(err => {
								return res.status(500).json({ err: "Something went wrong when computing stats" });
							});
			 })
			 .catch(err => {
				 return res.status(400).json({ err: "No chef found with this id" });
			 });
});

router.post('/update', (req, res) => {
	const { chefId } = req.body;

	const Chef = Parse.Object.extend("Chef");
	const queryChef = new Parse.Query(Chef);

	queryChef.get(chefId)
			 .then(chef => {
				 saveChefDetails(chef, req.body, () => {
					 chef.save()
						 .then(result => {
							 res.json({ newChef: result.attributes });
						 })
						 .catch(err => {
							 return res.status(400).json({ err: "Error at saving details. Please retry." });
						 });
				 });
			 })
			 .catch(err => {
				 return res.status(400).json({ err: "Error at saving details. Please retry." });
			 })
});

router.post('/updatePopup', (req, res) => {
	const {
		chefId,
		settingsId,
		name,
		dob,
		phoneNo,
		payment
	} = req.body;

	const Chef = Parse.Object.extend("Chef");
	const queryChef = new Parse.Query(Chef);

	queryChef.get(chefId)
			 .then(chef => {
				 chef.set("name", name);
				 chef.set("phoneNo", phoneNo);

				 chef.save()
					 .then(chef => {
						 const ChefSettings = Parse.Object.extend("ChefSettings");
						 const queryChefSettings = new Parse.Query(ChefSettings);

						 queryChefSettings.get(settingsId)
										  .then(settings => {
											  settings.set("dob", dob);
											  settings.set("payment", payment);

											  settings.save()
													  .then(() => {
														  res.json({ msg: "ok" });
													  });
										  });
					 });
			 });
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
	const {
		image,
		profileImage,
		description,
		delivery,
		categories,
	} = body;

	const negative = [
		'undefined', 'null'
	];

	chef.set("description", description);
	chef.set("cuisineType", JSON.parse(categories));

	const deliveryObject = JSON.parse(delivery);

	if ( !negative.includes(profileImage) ) {
		chef.set("profilePhotoURL", profileImage);
	}

	if ( !negative.includes(image) ) {
		chef.set("menuImage", image);
	}

	chef.set("deliveryRadius", deliveryObject.deliveryRadius);
	chef.set("deliveryCost", deliveryObject.deliveryCost);
	chef.set("pickupInstructions", deliveryObject.pickupInstructions)
	chef.set("delivery", deliveryObject.delivery);
	chef.set("pickup", deliveryObject.pickup);
	chef.set("address", deliveryObject.address);

	if ( deliveryObject.postcode !== '' ) {
		const point = new Parse.GeoPoint({
			latitude: deliveryObject.postcode.latitude,
			longitude: deliveryObject.postcode.longitude
		});

		chef.set("location", point);
		chef.set("postcode", deliveryObject.postcode.value);
	}

	cb();
}

module.exports = router;