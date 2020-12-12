import React from 'react';

import './orders-menu.styles.scss';

import OrdersList from "../orders-list/orders-list.component";

const OrdersMenu = (props) => {

	return (
		<div className="order_box">
			<div className="order_box_status_top bold_sofia">
				<div className="order_box_status">
					New
					<div className="order_status_notifications">0</div>
				</div>
				<div className="order_box_status">
					In progress
					<div className="order_status_notifications">1</div>
				</div>
				<div className="order_box_status order_box_no_border">
					Done
					<div className="order_status_notifications">0</div>
				</div>
			</div>
			<OrdersList/>
		</div>
	)
};

export default OrdersMenu;