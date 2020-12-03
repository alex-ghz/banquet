import React from 'react';

import './orders-list.styles.scss';

const OrdersList = () => (
	<div>
		<div className="order_details bold_sofia">
			<div className="order_details_left">
				<div className="order_id">#001</div>
				<div className="order_items">4 items (£19.00)</div>
				<div className="order_hour">15:32</div>
			</div>
			<div className="order_details_right">
				20 <span className="order_details_min">min</span>
			</div>
		</div>
		<div className="order_details bold_sofia">
			<div className="order_details_left">
				<div className="order_id">#001</div>
				<div className="order_items">4 items (£19.00)</div>
				<div className="order_hour">15:32</div>
			</div>
			<div className="order_details_right">
				20 <span className="order_details_min">min</span>
			</div>
		</div>
	</div>
);

export default OrdersList;