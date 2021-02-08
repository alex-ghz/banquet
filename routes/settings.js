const express = require('express');
const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
	},
	region: process.env.AWS_BUCKET_REGION
});

router.post('/uploadFile', async (req, res) => {
	const name = uuidv4();
	const { file } = req.files;

	if ( !!file === false ) {
		return;
	}

	const uploadParams = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: name,
		Body: file.data,
		ACL: '',
	};

	try {
		await s3.send(new PutObjectCommand(uploadParams));
		res.status(200).json({
			fileUrl: `https://${ process.env.AWS_BUCKET_NAME }.s3.eu-west-2.amazonaws.com/${ name }`
		})
	} catch ( err ) {
		res.status(500).json({ err: err });
	}

});

router.post('/addPayment', (req, res) => {
	const { settingsId, data } = req.body;

	if ( !!settingsId === false ) {
		return;
	}

	const ChefSettings = Parse.Object.extend("ChefSettings");
	const queryChefSettings = new Parse.Query(ChefSettings);

	queryChefSettings.get(settingsId)
					 .then(settings => {
						 settings.set("payment", data);

						 settings.save()
								 .then(result => {
									 res.json({ msg: "ok" });
								 });
					 });

});

router.post('/setChefFile', (req, res) => {
	let { settingsId, file, fileUrl, data } = req.body;

	const ChefSettings = Parse.Object.extend("ChefSettings");
	const queryChefSettings = new Parse.Query(ChefSettings);

	queryChefSettings.equalTo('objectId', settingsId);

	queryChefSettings.find()
					 .then(result => result[0])
					 .then(result => {

						 result.set(`${ file }_status`, 'submitted');
						 result.set(`${ file }_date`, data);
						 result.set(file, fileUrl);

						 result.save()
							   .then(result => {
								   res.json({ message: "ok" });
							   })
							   .catch(err => {
								   res.json({ err: true, message: "Error saving file", error: err });
							   })
					 });

});

router.post('/chef', (req, res) => {
	let { settingsId, settingName, value } = req.body;

	const ChefSettings = Parse.Object.extend("ChefSettings");
	const queryChefSettings = new Parse.Query(ChefSettings);

	queryChefSettings.equalTo('objectId', settingsId);

	queryChefSettings.find()
					 .then(result => result[0])
					 .then(result => {
						 result.set(settingName, value);

						 result.save()
							   .then(result => {
								   res.json({ message: "ok" });
							   })
							   .catch(err => {
								   res.json({ err: true, message: "Error saving settings", error: err });
							   })
					 });
});

router.post('/acceptingOrders', async (req, res) => {
	const { chefId, newValue } = req.body;

	if ( !!chefId === false || newValue === undefined ) {
		return res.status(400).json({ err: "Invalid parameters." });
	}

	const Chef = Parse.Object.extend("Chef");
	const queryChef = new Parse.Query(Chef);

	queryChef.get(chefId)
			 .then(chef => {
			 	if ( newValue === false ) {
					chef.set("online", false);
					chef.save()
						.then(chef => {
							return res.status(200).json({ chef: chef });
						})
						.catch(err => {
							return res.status(500).json({ err: "Error at toggling option." })
						});
				} else {
					checkChefSettingsForAcceptingOrders(chef.get("settings"))
						.then(() => {
							if ( !!chef.get("activated") === false || chef.get("activated") === false ) {
								return res.status(400).json({ err: "Your account was not activated" });
							}

							checkChefDishes(chef)
								.then(count => {
									if ( count === 0 ) {
										return res.status(400).json({ err: "No dish available for pickup/delivery" });
									}

									chef.set("online", true);

									chef.save()
										.then(chef => {
											return res.status(200).json({ chef: chef });
										})
										.catch(err => {
											return res.status(500).json({ err: "Error at toggling option." })
										});

								})
								.catch(err => {
									return res.status(400).json({ err: err });
								})
						})
						.catch(err => {
							return res.status(400).json({ err: err });
						});
				}
			 })
			 .catch(err => {
				 return res.status(400).json({ err: "Chef not found in db." });
			 });
});

function checkChefSettingsForAcceptingOrders(chefSettings) {
	return new Promise((resolve, reject) => {
		const ChefSettings = Parse.Object.extend("ChefSettings");
		const queryChefSettings = new Parse.Query(ChefSettings);

		queryChefSettings.get(chefSettings.id)
						 .then(settings => {
							 if ( settings.get("copy_of_id_status") !== 'verified' ) {
								 reject("Copy of id is not added/verified.");
							 }
							 if ( settings.get("food_hygeine_certificate_status") !== 'verified' ) {
								 reject("Copy of food hygiene is not added/verified.");
							 }
							 if ( settings.get("food_license_status") !== 'verified' ) {
								 reject("Food license is not added/verified.");
							 }

							 resolve();
						 })
						 .catch(err => {
							 reject("Settings not found");
						 })
	});
}

function checkChefDishes(chef) {
	return new Promise((resolve, reject) => {
		const Dish = Parse.Object.extend("Dish");
		const queryDish = new Parse.Query(Dish);

		queryDish.equalTo("chef", chef);

		queryDish.find()
				 .then(dishes => {
					 resolve(dishes.filter(dish => {
						 return dish.get("available");
					 }).length);
				 })
				 .catch(err => {
					 reject(err);
				 });
	});
}

module.exports = router;