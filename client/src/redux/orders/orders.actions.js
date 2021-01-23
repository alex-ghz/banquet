import OrdersTypes from "./orders.types";
import axios from "axios";

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