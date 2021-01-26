const express = require('express');
const router = express.Router();

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const s3 = new aws.S3({
	accessKeyId: 'AKIAUUI4QUDGM4O2L4HP',
	secretAccessKey: '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',
	Bucket: 'banqueteatsphotos'
});

const profileImgUpload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'banqueteatsphotos',
		acl: 'public-read',
		key: function (req, file, cb) {
			cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname));
		}
	}),
	limits: { fileSize: 2000000 },
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	}
}).single('profileImage');

function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
	if ( mimetype && extname ) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}

router.post('/file', profileImgUpload,(req, res) => {
	profileImgUpload(req, res, (err) => {
		console.log('err: ');
		console.log(err);

		console.log(req.files)
		console.log(req.file)

		if ( err ) {
			console.log('err found');
		} else {
			// If File not found
			if( req.file === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {
				// If Success
				const imageName = req.file.key;
				const imageLocation = req.file.location;
				console.log(req.file);
				res.json( {
					image: imageName,
					location: imageLocation
				} );
			}
		}
	})
});

module.exports = router;