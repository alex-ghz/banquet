import OrdersTypes from "./orders.types";
import axios from "axios";

export const setActiveSection = section => ({
	type: OrdersTypes.SET_ACTIVE_SECTION,
	payload: section
});

export const setActiveSectionOnUpdate = section => ({
	type: OrdersTypes.SET_ACTIVE_SECTION_ON_UPDATE,
	payload: section
});

export const setActiveDishDetails = dish => ({
	type: OrdersTypes.SET_ACTIVE_DISH_DETAILS,
	payload: dish
});

export const fetchOrderDetailsStart = () => ({
	type: OrdersTypes.FETCH_ORDERS_DETAILS_START
});

export const fetchOrderDetailsSuccess = orderDetails => ({
	type: OrdersTypes.FETCH_ORDERS_DETAILS_SUCCESS,
	payload: orderDetails
});

export const fetchOrderDetailsFailure = errorMessage => ({
	type: OrdersTypes.FETCH_ORDERS_DETAILS_FAILURE,
	payload: errorMessage
});

export const fetchOrderDetailsStartAsync = orderNo => {
	return dispatch => {
		axios.get('/orders/details', {
				 params: {
					 orderNo: orderNo
				 }
			 })
			 .then(result => result.data)
			 .then(data => data.data)
			 .then(data => dispatch(fetchOrderDetailsSuccess(data)))
			 .catch(err => dispatch(fetchOrderDetailsFailure(err)));
	}
};

export const fetchOrdersStart = () => ({
	type: OrdersTypes.FETCH_ORDERS_START
});

export const fetchOrdersSuccess = orders => ({
	type: OrdersTypes.FETCH_ORDERS_SUCCESS,
	payload: orders
});

export const fetchOrdersFailure = errorMessage => ({
	type: OrdersTypes.FETCH_ORDERS_FAILURE,
	payload: errorMessage
});

export const fetchOrdersStartAsync = chefId => {
	return dispatch => {
		axios.get('/orders/items', {
				 params: {
					 chefId: chefId
				 }
			 })
			 .then(result => result.data)
			 .then(data => data.orders)
			 .then(orders => {
				 let grouped = {
					 'new': [],
					 'inProgress': [],
					 'done': []
				 };

				 if ( !!orders['confirmed'] ) {
					 grouped['new'].push(...orders['confirmed'])
				 }
				 if ( !!orders['inProgress'] ) {
					 grouped['inProgress'].push(...orders['inProgress'])
				 }
				 if ( !!orders['delivering'] ) {
					 grouped['inProgress'].push(...orders['delivering'])
				 }
				 if ( !!orders['pickupReady'] ) {
					 grouped['inProgress'].push(...orders['pickupReady'])
				 }
				 if ( !!orders['canceled'] ) {
					 grouped['done'].push(...orders['canceled'])
				 }
				 if ( !!orders['complete'] ) {
					 grouped['done'].push(...orders['complete'])
				 }

				 dispatch(fetchOrdersSuccess(grouped));
			 })
			 .catch(error => dispatch(fetchOrdersFailure(error)));
	}
}