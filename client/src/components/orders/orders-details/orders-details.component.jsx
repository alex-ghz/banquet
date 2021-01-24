import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import Swal from 'sweetalert2';

import './orders-details.styles.scss';

import { selectOrderDetails, selectSelectedOrderDetail } from "../../../redux/orders/orders.selectors";
import { selectChefId } from "../../../redux/user/user.selectors";
import { setActiveSectionOnUpdate, setActiveSection } from "../../../redux/orders/orders.actions";

class OrdersDetails extends React.Component {

	state = {
		orderNo: 0,
		orderType: null,
		placedAt: new Date().getDay(),
		deliverTo: null,
		customerNote: null,
		customerInfo: '',
		order: null,
		status: "",
		showActions: false
	}

	componentDidMount() {
		const { order, orderNo } = this.props;
		const date = new Date(order.placedAt),
			day = (date.getDate() < 10 ? '0' : '') + date.getDate(),
			month = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1),
			yead = date.getFullYear(),
			hours = (date.getHours() < 10 ? '0' : '') + date.getHours(),
			minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

		this.setState({
			orderNo: orderNo,
			orderType: order.orderType,
			placedAt: day + '/' + month + '/' + yead + ' - ' + hours + ':' + minutes,
			deliverTo: !!order.deliveryTo ? order.deliveryTo.firstLine + ' ' + order.deliveryTo.secondLine : null,
			customerNote: !!order.customerNote ? order.customerNote : null,
			customerInfo: 'Name: ' + order.customerInfo.name + '; Phone number: ' + order.customerInfo.phoneNo,
			order: order.dishes,
			status: order.status,
			showActions: true
		});
	}

	triggerAlert = () => {
		Swal.fire({
			title: 'Are you sure you want to decline this order?',
			showDenyButton: true,
			confirmButtonText: `Yes`,
			denyButtonText: `No`,
		}).then((result) => {
			if ( result.isConfirmed ) {
				const { chefId, orderNo, reupdate, setSection } = this.props;

				axios.put('/orders/declineOrder', {
						 chefId: chefId,
						 orderNo: orderNo
					 })
					 .then(response => {
						 Swal.fire('Order was set as declined and moved to Done section!');
						 reupdate();
						 setSection('done');
					 })
					 .catch(err => {
						 console.log(err);
					 })
			}
		})
	}

	handleAcceptOrder = () => {
		const { chefId, orderNo, reupdate, setSection } = this.props;

		axios.put('/orders/acceptOrder', {
				 chefId: chefId,
				 orderNo: orderNo
			 })
			 .then(response => {
				 Swal.fire('Order was moved to In progress section!');
				 reupdate();
				 setSection('inProgress');
			 })
			 .catch(err => {
				 console.log(err);
			 })
	}

	handleDeliveryReady = () => {
		const { chefId, orderNo, reupdate } = this.props;

		axios.put('/orders/delivering', {
				 chefId: chefId,
				 orderNo: orderNo
			 })
			 .then(response => {
				 Swal.fire('Client was notified that the food is on his way!');
				 reupdate();
			 })
			 .catch(err => {
				 console.log(err);
			 })
	}

	handlePickupReady = () => {
		const { chefId, orderNo, reupdate } = this.props;

		axios.put('/orders/pickupReady', {
				 chefId: chefId,
				 orderNo: orderNo
			 })
			 .then(response => {
				 Swal.fire('Client was notified that the food is ready to be picked up!');
				 reupdate();
			 })
			 .catch(err => {
				 console.log(err);
			 })
	}

	handleComplete = () => {
		const { chefId, orderNo, reupdate, setSection } = this.props;

		axios.put('/orders/complete', {
				 chefId: chefId,
				 orderNo: orderNo
			 })
			 .then(response => {
				 Swal.fire('Order was set as completed and moved to Done section');
				 reupdate();
				 setSection('done');
			 })
			 .catch(err => {
				 console.log(err);
			 })
	}

	getStatus = (status) => {
		switch ( status ) {
			case 'confirmed':
				return 'Created';
			case 'inProgress':
				return 'Cooking...';
			case 'pickupReady':
				return 'Pickup ready';
			case 'canceled':
				return 'Canceled';
			case 'delivering':
				return 'Delivering';
			case 'complete':
				return 'Complete';
			default:
				return 'Created';
		}
	}

	getActions = (status) => {
		switch ( status ) {
			case 'confirmed':
				return (
					<div className="buttons">
						<div className="ready_food_btn bold_sofia" onClick={ this.handleAcceptOrder }>Accept
							Order
						</div>
						<div className="ready_food_btn bold_sofia" onClick={ this.triggerAlert }>Decline Order
						</div>
					</div>
				);
			case 'inProgress':
				if ( this.state.orderType === 'DELIVERY' ) {
					return (
						<div className="buttons">
							<div className="ready_food_btn bold_sofia" onClick={ this.handleDeliveryReady }>Delivery
								ready
							</div>
						</div>
					);
				} else {
					return (
						<div className="buttons">
							<div className="ready_food_btn bold_sofia" onClick={ this.handlePickupReady }>Pickup ready
							</div>
						</div>
					);
				}
			case 'pickupReady':
			case 'delivering':
				return (
					<div className="buttons">
						<div className="ready_food_btn bold_sofia" onClick={ this.handleComplete }>Complete</div>
					</div>
				);
			case 'complete':
			default:
				return null;
		}
	}

	render() {

		return (
			<div>
				<div className="order_right_inner">
					<div className="order_right_id sb_sofia">#{ this.state.orderNo }</div>
					<div className="order_details_first">
						<div className="order_details_first_box">
							<div className="order_static_title medium_sofia">ORDER TYPE</div>
							<div className="order_dynamic_text sb_sofia">{ this.state.orderType }</div>
						</div>
						<div className="order_details_first_box">
							<div className="order_static_title medium_sofia">PLACED AT</div>
							<div className="order_dynamic_text sb_sofia">{ this.state.placedAt }</div>
						</div>
						<div className="order_details_first_box">
							<div className="order_static_title medium_sofia">STATUS</div>
							<div className="order_dynamic_text sb_sofia">{ this.getStatus(this.state.status) }</div>
						</div>
					</div>
					{
						this.state.orderType === 'DELIVERY' ?
							<div className="order_details_second">
								<div className="order_details_second_box_full">
									<div className="order_second_box_left">
										<div className="order_static_title medium_sofia">DELIVERING TO</div>
										<div className="order_dynamic_text order_client_address sb_sofia">
											{ this.state.deliverTo }
										</div>
									</div>
								</div>
							</div>
							: null
					}
					{
						this.state.customerNote ?
							<div className="order_details_second">
								<div className="order_details_second_box_full">
									<div className="order_second_box_left">
										<div className="order_static_title medium_sofia">CUSTOMER NOTE</div>
										<div className="order_dynamic_text order_client_address sb_sofia">
											{ this.state.customerNote }
										</div>
									</div>
								</div>
							</div>
							: null
					}
					<div className="order_details_second">
						<div className="order_details_second_box_full">
							<div className="order_second_box_left">
								<div className="order_static_title medium_sofia">CUSTOMER INFO</div>
								<div className="order_dynamic_text order_client_address sb_sofia">
									{ this.state.customerInfo }
								</div>
							</div>
						</div>
					</div>
					{
						this.state.order ?
							<div className="order_details_third">
								<div className="order_details_third_title medium_sofia">
									ORDER DETAILS
								</div>
								<div className="order_panel_detail">
									<div className="order_panel_detail_left">
										<div className="order_panel_category sb_sofia">MAINS</div>
									</div>
									<div className="order_panel_detail_right medium_sofia">
										<p className="product_qty medium_sofia">0 x</p>
										<div className="order_panel_product_name">Dish Name</div>
										<div className="order_panel_product_price">£0.00</div>
									</div>
								</div>
								<div className="order_panel_detail">
									<div className="order_panel_detail_left">
										<div className="order_panel_category sb_sofia">SIDES</div>
										<p className="product_qty medium_sofia">0 x</p>
									</div>
									<div className="order_panel_detail_right medium_sofia">
										<div className="order_panel_product_name">Dish Name</div>
										<div className="order_panel_product_price">£0.00</div>
									</div>
								</div>
								<div className="order_panel_total medium_sofia">
									ORDER TOTAL <span className="order_total_price bold_sofia">£0.00</span>
								</div>
							</div>
							: null
					}
					{
						this.state.showActions ?
							this.getActions(this.state.status)
							: null
					}

				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	order: selectOrderDetails,
	orderNo: selectSelectedOrderDetail,
	chefId: selectChefId
});

const mapDispatchToProps = dispatch => ({
	setSection: section => dispatch(setActiveSection(section))
});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersDetails);