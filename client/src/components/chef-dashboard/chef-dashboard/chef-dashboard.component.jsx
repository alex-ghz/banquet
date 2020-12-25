import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/all";
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";

import './chef-dashboard.styles.scss';

import ChefDashboardCardSmall from "../chef-dashboard-card-small/chef-dashboard-card-small.component";
import Reviews from "../../reviews/reviews/reviews.component";
import GettingStarted from "../../getting-started/getting-started.component";
import ChefDashboardNotification from "../chef-dashboard-notification/chef-dashboard-notification.component";
import { getDashboardNotification } from "../../../redux/notification/notification.selectors";

const ChefDashboard = ({dashboardNotification}) => {
	const smallCards = [
		{
			id: "yourRatingCard",
			title: "Your Rating",
			value: "5.0",
			description: "out of 5"
		},
		{
			id: "activeOrdersCard",
			title: "Active Orders",
			value: "0",
			description: ""
		},
		{
			id: "salesCard",
			title: "You've made",
			value: "0.00",
			description: "In sales"
		},
		{
			id: "ordersCompletedCard",
			title: "You've completed",
			value: "0",
			description: "orders"
		}
	];

	return (
		<div className='home_section_inner'>
			{
				dashboardNotification ? <ChefDashboardNotification/> : null
			}
			<div className="day_moment sb_sofia">
				<AiOutlineLeft/>
				<div className="selected_moment">Today</div>
				<AiOutlineRight/>
			</div>
			<div className="orders_information">
				{
					smallCards.map(card => (<ChefDashboardCardSmall key={ card.id } { ...card }/>))
				}
			</div>
			<Reviews/>
			<GettingStarted/>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	dashboardNotification: getDashboardNotification
});

export default connect(mapStateToProps)(ChefDashboard);