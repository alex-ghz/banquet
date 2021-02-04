import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './orders-list.styles.scss';

import {
	selectAllOrders, selectOrdersCategory,
} from "../../../redux/orders/orders.selectors";
import {
	setActiveDishDetails,
	fetchOrderDetailsStart,
	fetchOrderDetailsStartAsync
} from "../../../redux/orders/orders.actions";

class OrdersList extends React.Component {

	state = {
		orders: {
			new: [],
			inProgress: [],
			done: []
		},
		category: 'new',
		items: []
	};

	componentDidMount() {
		const { orders, category } = this.props;

		if ( !!orders[category] ) {
			this.setState({
				orders: orders,
				category: category,
				items: orders[category]
			});
		}
	}

	handleOnClick = orderNo => {
		const { setActiveDishDetails, startFetchingOrderDetails, startFetchingOrderDetailsAsync } = this.props;
		setActiveDishDetails(orderNo);
		startFetchingOrderDetails();
		startFetchingOrderDetailsAsync(orderNo);
	}

	render() {
		const { orders, category } = this.props;
		let items = orders[category];

		if ( !!items === false ) {
			items = this.state.orders[this.state.category];
		}

		return (
			<div>
				{
					items.map((item, index) => (
						<div className="order_details bold_sofia" key={ index }
							 onClick={ () => this.handleOnClick(item.orderNo) }>
							<div className="order_details_left">
								<div className="order_id">#{ item.orderNo }</div>
								<div className="order_items">{ item.items.length } items (£{ item.total })</div>
								<div className="order_hour">
									{ new Date(item.createdAt).getHours() }:{ new Date(item.createdAt).getMinutes() < 10 ? '0' : '' }{ new Date(item.createdAt).getMinutes() }
								</div>
							</div>
						</div>
					))
				}
			</div>
		);
	}
}

const mapStateToProp = createStructuredSelector({
	orders: selectAllOrders,
	category: selectOrdersCategory
});

const mapDispatchToProps = dispatch => ({
	setActiveDishDetails: section => dispatch(setActiveDishDetails(section)),
	startFetchingOrderDetails: () => dispatch(fetchOrderDetailsStart()),
	startFetchingOrderDetailsAsync: orderNo => dispatch(fetchOrderDetailsStartAsync(orderNo))
});

export default connect(mapStateToProp, mapDispatchToProps)(OrdersList);