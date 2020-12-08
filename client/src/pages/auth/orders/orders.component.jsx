import React from 'react';

import './orders.styles.scss';

import OrdersMenu from "../../../components/orders/orders-menu/orders-menu.component";
import OrdersDetails from "../../../components/orders/orders-details/orders-details.component";

class Orders extends React.Component {

	render() {
		return (
			<div className="order_div">
				<div className="order_section">
					<OrdersMenu test='sadasda'/>
					<OrdersDetails/>
				</div>
			</div>

		);
	}
}

export default Orders;