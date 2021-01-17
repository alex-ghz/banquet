const express = require('express');
const router = express.Router();

router.post('/uploadFile', (req, res) => {
	const userFile = req.files.file;
	const userFileName = Date.now() + '.' + getFileExtension(userFile.name);

	const data = Array.from(Buffer.from(userFile.data, 'binary'));
	const parseFile = new Parse.File(userFileName, data);

	parseFile.save()
			 .then(result => {
				 res.status(200).json({ fileUrl: result.url() });
			 })
			 .catch(err => {
				 res.json({ err: true, message: "File corrupted", error: err });
			 });

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