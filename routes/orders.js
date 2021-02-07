const express = require('express');
const router = express.Router();

router.put('/acceptOrder', (req, res) => {
	let { orderNo, chefId } = req.body;
	changeOrderStatusWrapper(chefId, orderNo, "inProgress", res);
});

router.put('/declineOrder', (req, res) => {
	let { orderNo, chefId } = req.body;
	changeOrderStatusWrapper(chefId, orderNo, "canceled", res);
});

router.put('/delivering', (req, res) => {
	let { orderNo, chefId } = req.body;
	changeOrderStatusWrapper(chefId, orderNo, "delivering", res);
});

router.put('/pickupReady', (req, res) => {
	let { orderNo, chefId } = req.body;
	changeOrderStatusWrapper(chefId, orderNo, "pickupReady", res);
});

router.put('/complete', (req, res) => {
	let { orderNo, chefId } = req.body;
	changeOrderStatusWrapper(chefId, orderNo, "complete", res);
});

router.get('/details', (req, res) => {
	const { orderNo } = req.query;

	if ( !!orderNo === false ) {
		return res.status(400).json({ err: "No order number provided" });
	}

	const Order = Parse.Object.extend("Order");
	const queryOrder = new Parse.Query(Order);

	queryOrder.equalTo("orderNo", parseInt(orderNo, 10));

	queryOrder.find()
			  .then(results => results[0])
			  .then(order => {
				  getFormattedOrder(order)
					  .then(order => {
						  return res.status(200).json({
							  data: order
						  });
					  })
					  .catch(err => {
						  return res.status(500).json({ err: err });
					  });
			  })
			  .catch(err => {
				  return res.status(400).json({ err: "Something went wrong went searching for the order" });
			  })

});

function getFormattedOrder(order) {
	return new Promise((resolve, reject) => {
		const delivery = order.get("delivery");

		if ( delivery ) {
			getAddress(order.get("address"))
				.then(address => {
					getClient(order.get("client"))
						.then(client => {
							getDishes(order.get("items"))
								.then(dishes => {
									Promise.all(dishes)
										   .then(dishes => {
											   resolve({
												   orderType: order.get("delivery") ? "DELIVERY" : "PICKUP",
												   placedAt: order.get("createdAt"),
												   deliveryTo: address,
												   customerNote: order.get("notes"),
												   customerInfo: client,
												   status: order.get("status"),
												   total: order.get("total"),
												   taxes: {
													   serviceFee: order.get("serviceFee"),
													   subtotal: order.get("subtotal"),
													   deliveryFee: order.get("deliveryFee")
												   },
												   itemsRaw: order.get("items"),
												   dishes: groupBy(dishes, "category")
											   });
										   })
								})
								.catch(err => {
									reject("Err at dishes search");
								})
						})
						.catch(err => {
							reject("Client could not be found");
						})
				})
				.catch(err => {
					reject("Address of the order was not found");
				});
		} else {
			getClient(order.get("client"))
				.then(client => {
					getDishes(order.get("items"))
						.then(dishes => {
							Promise.all(dishes)
								   .then(dishes => {
									   resolve({
										   orderType: order.get("delivery") ? "DELIVERY" : "PICKUP",
										   placedAt: order.get("createdAt"),
										   deliveryTo: null,
										   customerNote: order.get("notes"),
										   customerInfo: client,
										   status: order.get("status"),
										   total: order.get("total"),
										   taxes: {
											   serviceFee: order.get("serviceFee"),
											   subtotal: order.get("subtotal"),
											   deliveryFee: order.get("deliveryFee")
										   },
										   itemsRaw: order.get("items"),
										   dishes: groupBy(dishes, "category")
									   });
								   })
						})
						.catch(err => {
							reject("Err at dishes search");
						})
				})
				.catch(err => {
					reject("Client could not be found");
				})
		}

	});
}

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
							   res.status(200).json({ orders: groupedOrdersByStatus })
						   })
						   .catch(err => {
							   return res.json(400).json({ err: "Something went wrong at orders search" });
						   });
			 })
			 .catch(err => {
				 return res.status(400).json({ err: "Wrong ChefId" });
			 })
});

function changeOrderStatusWrapper(chefId, orderNo, newStatus, res) {
	changeOrderStatus(chefId, orderNo, newStatus)
		.then(order => {
			getFormattedOrder(order)
				.then(order => {
					res.status(200).json({ order: order });
				})
				.catch(err => {
					return res.status(500).json({ err: err });
				});

			notifyClient(order)
				.then(response => {
					console.log(response);
				})
				.catch(err => {
				});
		})
		.catch(err => {
			return res.status(400).json({ err: err });
		});
}

function changeOrderStatus(chefId, orderNo, newStatus) {
	return new Promise((resolve, reject) => {
		if ( !!orderNo === false && !!chefId === false ) {
			reject("Missing parameters");
		}

		const Chef = Parse.Object.extend("Chef");
		const queryChef = new Parse.Query(Chef);

		queryChef.get(chefId)
				 .then(chef => {
					 const Order = Parse.Object.extend("Order");
					 const queryOrder = new Parse.Query(Order);

					 queryOrder.equalTo("chef", chef);
					 queryOrder.equalTo("orderNo", orderNo);

					 queryOrder.find()
							   .then(orders => orders[0])
							   .then(order => {
								   order.set("status", newStatus);

								   order.save()
										.then(() => {
											resolve(order);
										})
										.catch(() => {
											reject("Something went wrong at updating order");
										})
							   })
							   .catch(err => {
								   reject("No order found with these params");
							   })
				 })
				 .catch(err => {
					 reject("No chef found with this id");
				 });
	});
}

const groupBy = (xs, key) => {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

function getAddress(address) {
	return new Promise((resolve, reject) => {
		const Address = Parse.Object.extend("Address");
		const queryAddress = new Parse.Query(Address);

		queryAddress.equalTo("objectId", address.id);

		queryAddress.find()
					.then(results => {
						if ( results.length === 0 ) {
							return [].push(null);
						}

						return results;
					})
					.then(results => results[0])
					.then(address => resolve(address))
					.catch(err => reject(err));
	});
}

function getClient(client) {
	return new Promise((resolve, reject) => {
		const Client = Parse.Object.extend("Client");
		const queryClient = new Parse.Query(Client);

		queryClient.equalTo("objectId", client.id);

		queryClient.find()
				   .then(results => results[0])
				   .then(client => resolve({
					   name: !!client.get("name") ? client.get("name") : '',
					   phoneNo: !!client.get("phoneNo") ? client.get("phoneNo") : ''
				   }))
				   .catch(err => reject(err));
	});
}

function getDishes(dishesIds) {
	return new Promise((resolve, reject) => {
		const Dish = Parse.Object.extend("Dish");
		const queryDish = new Parse.Query(Dish);
		const occ = countOccurencies(dishesIds);

		queryDish.containedIn("objectId", dishesIds);

		queryDish.find()
				 .then(dishes => resolve(dishes.map(dish => {
					 return getCategory(dish.get("category"))
						 .then(category => {
							 return {
								 name: dish.get("name"),
								 price: dish.get("price"),
								 category: category,
								 qty: occ[dish.id]
							 }
						 })
						 .catch(err => reject(err));
				 })))
				 .catch(err => reject(err));
	});
}

function getCategory(category) {
	return new Promise((resolve, reject) => {
		const MenuCategory = Parse.Object.extend("MenuCategory");
		const queryMenuCategory = new Parse.Query(MenuCategory);

		queryMenuCategory.equalTo("objectId", category.id);

		queryMenuCategory.find()
						 .then(results => results[0])
						 .then(category => resolve(category.get("name")))
						 .catch(err => reject(err));
	});
}

function countOccurencies(arr) {
	let occ = [];

	arr.forEach(elem => {
		if ( !!occ[elem] === false ) {
			occ[elem] = 0;
		}
		occ[elem]++;
	});

	return occ;
}

function notifyClient(order) {
	return new Promise(resolve => {
		const User = Parse.Object.extend("User");
		const queryUser = new Parse.Query(User);

		queryUser.equalTo("client", order.get("client"));

		queryUser.find()
				 .then(users => users[0])
				 .then(user => {
					 const Session = Parse.Object.extend("_Session");
					 const querySession = new Parse.Query(Session);

					 querySession.equalTo("user", user);
					 querySession.descending("createdAt");

					 querySession.find({ useMasterKey: true })
								 .then(sessions => sessions[0])
								 .then(session => {

									 const pushQuery = new Parse.Query(Parse.Installation);
									 pushQuery.equalTo("installationId", session.get("installationId"));

									 Parse.Push.send({
											  where: pushQuery,
											  data: {
												  push_type: "background",
												  "content-available": 1,
													"alert":{},
													priority: 10,
												  custom: {
													  orderId: order.id,
													  newState: order.get("status")
												  }
											  }
										  }, { useMasterKey: true })
										  .then(result => {
											  resolve(result);
										  })
										  .catch(err => {
											  resolve(err);
										  })

								 })
								 .catch(err => {
									 resolve(err);
								 });
				 })
				 .catch(err => {
					 resolve(err);
				 });
	});
}

function getNotificationMessage(orderStatus) {
	switch ( orderStatus ) {
		case 'inProgress':
			return 'The chef has started preparing your order';
		case 'delivering':
			return 'Your order is ready and out for delivery';
		case 'pickupReady':
			return 'Your order is ready for pickup';
		case 'complete':
			return 'Your order is complete. Enjoy!';
		case 'canceled':
			return 'Your order has been cancelled';
		default:
			return '';
	}
}


router.post('/test', (req, res) => {
	const { orderId } = req.body;

	const Order = Parse.Object.extend("Order");
	const queryOrder = new Parse.Query(Order);

	queryOrder.equalTo("objectId", orderId);

	queryOrder.find()
			  .then(results => results[0])
			  .then(result => {
				  notifyClient(result)
					  .then(result => {
						  res.json({ data: result })

					  })
			  })
});

module.exports = router;
