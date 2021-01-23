const express = require('express');
const router = express.Router();

router.get('/items', (req, res) => {
	const { chefId } = req.query;

	if ( !!chefId === false ) {
		return res.status(400).json({ err: "No Chef provided" });
	}

	const Chef = Parse.Object.extend("Chef");
	const queryChef = new Parse.Query(Chef);

	queryChef.get(chefId)
			 .then(chef => {
				 const Order = Parse.Object.extend("Order");
				 const queryOrder = new Parse.Query(Order);

				 queryOrder.equalTo("chef", chef);

				 queryOrder.find()
						   .then(orders => {
							   let groupedOrdersByStatus = groupBy(orders.map(order => order.attributes), 'status');
							   res.status(200).json({orders: groupedOrdersByStatus})
						   })
						   .catch(err => {
							   return res.json(400).json({ err: "Something went wrong at orders search" });
						   });
			 })
			 .catch(err => {
				 return res.status(400).json({ err: "Wrong ChefId" });
			 })
});

const groupBy = (xs, key) => {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

module.exports = router;