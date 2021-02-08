const express = require('express');
const router = express.Router();

const FileType = require('file-type');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_KEY,
	},
	region: process.env.AWS_BUCKET_REGION
});
const upload = multer({ storage: multer.memoryStorage() });

router.post('/image', async (req, res) => {
	upload.single('image')(req, res, async (err) => {
		if ( err ) {
			return res.status(400).json({ err: err });
		}

		const acceptedFileTypes = ['jpg', 'png'];

		const { image } = req.files;
		const type = await FileType.fromBuffer(image.data);
		const name = uuidv4() + '.' + type.ext;

		if ( !acceptedFileTypes.includes(type.ext) ) {
			return res.status(400).json({ err: "Please upload a valid image. (.jpg/png)" });
		}

		const uploadParams = {
			Bucket: process.env.AWS_BUCKET_NAME,
			Key: name,
			Body: image.data,
			ACL: 'public-read',
		};

		try {
			await s3.send(new PutObjectCommand(uploadParams));
			res.status(200).json({
				file: name,
				url: `https://${ process.env.AWS_BUCKET_NAME }.s3.eu-west-2.amazonaws.com/${ name }`
			})
		} catch ( err ) {
			console.log("s3 err", err);
			res.status(500).json({ err: err });
		}
	});
});

module.exports = router;