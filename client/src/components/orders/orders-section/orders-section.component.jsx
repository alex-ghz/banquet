import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import OrdersDetails from "../../../components/orders/orders-details/orders-details.component";
import OrdersMenu from "../orders-menu/orders-menu.component";

import {
	selectSelectedOrderDetail,
	selectIsOrderDetailsLoaded,
	selectIsOrderDetailsFetching
} from "../../../redux/orders/orders.selectors";
import WithSpinner from "../../with-spinner/with-spinner.component";

const OrdersDetailsWithSpinner = WithSpinner(OrdersDetails);

class OrdersSection extends React.Component {

	render() {
		const { selectedOrderDetails, ordersDetailsIsLoaded, orderDetailsIsFetching, reupdate } = this.props;
		const isLoading = ordersDetailsIsLoaded === true && orderDetailsIsFetching === false;

		return (
			<div className="order_div">
				<div className="order_section">
					<OrdersMenu/>
					{
						selectedOrderDetails ?
							<div className="order_section_right">
								<OrdersDetailsWithSpinner isLoading={ !isLoading } reupdate={reupdate}/>
							</div>
							: null
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	selectedOrderDetails: selectSelectedOrderDetail,
	ordersDetailsIsLoaded: selectIsOrderDetailsLoaded,
	orderDetailsIsFetching: selectIsOrderDetailsFetching
});

export default connect(mapStateToProps)(OrdersSection);