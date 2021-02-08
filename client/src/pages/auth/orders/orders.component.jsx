import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './orders.styles.scss';

import WithSpinner from "../../../components/with-spinner/with-spinner.component";
import OrdersSection from "../../../components/orders/orders-section/orders-section.component";

import { fetchOrdersStartAsync, fetchOrdersStart } from "../../../redux/orders/orders.actions";
import { selectIsOrdersFetching, selectIsOrdersLoaded } from "../../../redux/orders/orders.selectors";
import { selectChefId } from "../../../redux/user/user.selectors";

const OrdersSectionSpinner = WithSpinner(OrdersSection);

class Orders extends React.Component {

	componentDidMount() {
		this.updateSection()
	}

	updateSection = () => {
		let { fetchOrdersStart, fetchOrdersStartAsync, isFetching, chefId } = this.props;

		if ( !isFetching ) {
			fetchOrdersStart();
			fetchOrdersStartAsync(chefId);
		}
	}

	render() {
		let { isLoaded, isFetching } = this.props;
		let isLoading = isLoaded === true && isFetching === false;

		return (
			<div>
				<OrdersSectionSpinner isLoading={ !isLoading } reupdate={this.updateSection}/>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isFetching: selectIsOrdersFetching,
	isLoaded: selectIsOrdersLoaded,
	chefId: selectChefId
});

const mapDispatchToProps = dispatch => ({
	fetchOrdersStart: () => dispatch(fetchOrdersStart()),
	fetchOrdersStartAsync: chefId => dispatch(fetchOrdersStartAsync(chefId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);