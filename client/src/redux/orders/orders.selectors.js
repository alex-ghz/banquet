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