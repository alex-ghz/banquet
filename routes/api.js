const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
	res.status(200).json({msg: "ok"});
});

module.exports = router;