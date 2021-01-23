import OrdersTypes from "./orders.types";

const INITIAL_STATE = {
	orders: [],
	isFetching: false,
	errorMessage: null,
	selectedOrdersCategory: null
};

const ordersReducer = (state = INITIAL_STATE, action) => {
	switch ( action.type ) {
		case OrdersTypes.FETCH_ORDERS_START:
			return {
				...state,
				isFetching: true
			}
		case OrdersTypes.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				orders: action.payload,
				isFetching: false,
				selectedOrdersCategory: 'new'
			}
		case OrdersTypes.FETCH_ORDERS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			}
		default:
			return state;
	}
}

export default ordersReducer;