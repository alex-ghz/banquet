import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './orders-menu.styles.scss';

import OrdersList from "../orders-list/orders-list.component";

import { selectAllOrders } from "../../../redux/orders/orders.selectors";
import { setActiveSection, setActiveDishDetails } from "../../../redux/orders/orders.actions";

class OrdersMenu extends React.Component {

	state = {
		orders: {
			new: [],
			inProgress: [],
			done: []
		}
	}

	componentDidMount() {
		const { orders } = this.props;

		this.setState({
			orders: orders
		});
	}

	handleOnClick = section => {
		const { setActiveSection } = this.props;
		setActiveSection(section);
	}

	render() {
		const { orders } = this.state;

		return (
			<div className="order_box">
				<div className="order_box_status_top bold_sofia">
					<div className="order_box_status" onClick={ () => this.handleOnClick('new') }>
						New
						<div className="order_status_notifications">{ orders['new'].length }</div>
					</div>
					<div className="order_box_status" onClick={ () => this.handleOnClick('inProgress') }>
						In progress
						<div className="order_status_notifications">{ orders['inProgress'].length }</div>
					</div>
					<div className="order_box_status order_box_no_border" onClick={ () => this.handleOnClick('done') }>
						Done
						<div className="order_status_notifications">{ orders['done'].length }</div>
					</div>
				</div>
				<OrdersList/>
			</div>
		)
	}
}

const mapStateToProps = createStructuredSelector({
	orders: selectAllOrders
});

const mapDispatchToProps = dispatch => ({
	setActiveSection: section => dispatch(setActiveSection(section))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersMenu);