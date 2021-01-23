import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from "reselect";

import OrdersDetails from "../../../components/orders/orders-details/orders-details.component";
import OrdersMenu from "../orders-menu/orders-menu.component";

class OrdersSection extends React.Component {

	render() {

		return (
			<div className="order_div">
				<div className="order_section">
					<OrdersMenu test='sadasda'/>
					{/*<OrdersDetails/>*/ }
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({

});

export default OrdersSection;