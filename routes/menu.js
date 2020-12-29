const express = require('express');
const router = express.Router();

router.post('/getMenu', (req, res) => {
	let { menuId } = req.body;

	res.json({msg: "ok"});
});

module.exports = router;