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
	let { settingsId, file, fileUrl } = req.body;

	const ChefSettings = Parse.Object.extend("ChefSettings");
	const queryChefSettings = new Parse.Query(ChefSettings);

	queryChefSettings.equalTo('objectId', settingsId);

	queryChefSettings.find()
					 .then(result => result[0])
					 .then(result => {

						 result.set(`${ file }_status`, 'submitted');
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

function getFileExtension(fileName) {
	let arr = fileName.split('.');
	return arr[arr.length - 1];
}

module.exports = router;