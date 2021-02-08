import OrdersTypes from "./orders.types";

const INITIAL_STATE = {
	orders: [],
	isFetching: false,
	errorMessage: null,
	selectedOrdersCategory: 'new',
	selectedOrderDetails: null,
	isFetchingDetails: false,
	orderDetails: null,
	errorMessageDetails: null
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
				isFetching: false
			}
		case OrdersTypes.FETCH_ORDERS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			}
		case OrdersTypes.SET_ACTIVE_SECTION:
			return {
				...state,
				selectedOrdersCategory: action.payload,
				selectedDishDetails: null
			}
		case OrdersTypes.SET_ACTIVE_SECTION_ON_UPDATE:
			return {
				...state,
				selectedDishDetails: null
			}
		case OrdersTypes.SET_ACTIVE_DISH_DETAILS:
			return {
				...state,
				selectedDishDetails: action.payload
			}
		case OrdersTypes.FETCH_ORDERS_DETAILS_START:
			return {
				...state,
				isFetchingDetails: true
			}
		case OrdersTypes.FETCH_ORDERS_DETAILS_SUCCESS:
			return {
				...state,
				orderDetails: action.payload,
				isFetchingDetails: false
			}
		case OrdersTypes.FETCH_ORDERS_DETAILS_FAILURE:
			return {
				...state,
				errorMessageDetails: action.payload
			}
		default:
			return state;
	}
}

export default ordersReducer;