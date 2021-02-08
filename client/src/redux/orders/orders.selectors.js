import { createSelector } from "reselect";

const selectOrders = state => state.orders;

export const selectIsOrdersFetching = createSelector(
	[selectOrders],
	orders => orders.isFetching
);

export const selectIsOrdersLoaded = createSelector(
	[selectOrders],
	orders => !!orders.orders
);

export const selectOrdersCategoryItems = createSelector(
	[selectOrders],
	orders => orders.orders[orders.selectedOrdersCategory]
);

export const selectOrdersCategory = createSelector(
	[selectOrders],
	orders => orders.selectedOrdersCategory
);

export const selectAllOrders = createSelector(
	[selectOrders],
	orders => orders.orders
);

export const selectSelectedOrderDetail = createSelector(
	[selectOrders],
	orders => orders.selectedDishDetails
);

export const selectIsOrderDetailsFetching = createSelector(
	[selectOrders],
	orders => orders.isFetchingDetails
);

export const selectIsOrderDetailsLoaded = createSelector(
	[selectOrders],
	orders => !!orders.orderDetails
);

export const selectOrderDetails = createSelector(
	[selectOrders],
	orders => orders.orderDetails
);

export const selectNewOrders = createSelector(
	[selectOrders],
	orders => orders.orders.new
);