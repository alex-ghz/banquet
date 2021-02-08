import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/all";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import axios from "axios";

import './chef-dashboard.styles.scss';

import ChefDashboardCardSmall from "../chef-dashboard-card-small/chef-dashboard-card-small.component";
import GettingStarted from "../../getting-started/getting-started.component";
import ChefDashboardNotification from "../chef-dashboard-notification/chef-dashboard-notification.component";
import { selectIsUserActivated } from "../../../redux/user/user.selectors";
import { selectChefId } from "../../../redux/user/user.selectors";

class ChefDashboard extends React.Component {

	state = {
		rating: 0,
		activeOrders: 0,
		sales: 0,
		completedOrders: 0
	}

	componentDidMount() {
		const { chefId } = this.props;
		axios.get(`/profile/stats?chefId=${ chefId }`)
			 .then(response => response.data)
			 .then(data => {
				 this.setState({
					 rating: data.rating,
					 activeOrders: data.activeOrders,
					 sales: data.sales,
					 completedOrders: data.completedOrders
				 });
			 })
			 .catch(err => {
				 console.log(err.response);
			 });
	}

	render() {

		const smallCards = [
			{
				id: "yourRatingCard",
				title: "Your Rating",
				value: this.state.rating,
				description: "out of 5"
			},
			{
				id: "activeOrdersCard",
				title: "Active Orders",
				value: this.state.activeOrders,
				description: ""
			},
			{
				id: "salesCard",
				title: "You've made",
				value: this.state.sales,
				description: "In sales"
			},
			{
				id: "ordersCompletedCard",
				title: "You've completed",
				value: this.state.completedOrders,
				description: "orders"
			}
		];

		return (
			<div className='home_section_inner'>
				{
					!!this.props.dashboardNotification === false
					|| this.props.dashboardNotification === false ? <ChefDashboardNotification/> : null
				}
				<div className="day_moment sb_sofia">
					{/*<AiOutlineLeft/>*/ }
					{/*<div className="selected_moment">Today</div>*/ }
					{/*<AiOutlineRight/>*/ }
				</div>
				<div className="orders_information">
					{
						smallCards.map(card => (<ChefDashboardCardSmall key={ card.id } { ...card }/>))
					}
				</div>
				{/*<Reviews/>*/ }
				{
					!!this.props.dashboardNotification === false
					|| this.props.dashboardNotification === false ? <GettingStarted/>
						: null
				}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	dashboardNotification: selectIsUserActivated,
	chefId: selectChefId
});

export default connect(mapStateToProps)(ChefDashboard);