Parse.Cloud.define('createOrder', async (request) => {
	const Order = Parse.Object.extend("Order");
	const orderQuery = new Parse.Query(Order);
	const numberOfOrders = await orderQuery.count();
	const order = new Order();

	order.set("orderNo", numberOfOrders + 1);

	return await order.save();
});

