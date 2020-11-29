import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/all";

import './chef-dashboard.styles.scss';

import ChefDashboardCardSmall from "../chef-dashboard-card-small/chef-dashboard-card-small.component";

const ChefDashboard = () => {
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
			<div className="day_moment sb_sofia">
				<AiOutlineLeft/>
				<div className="selected_moment">Today</div>
				<AiOutlineRight/>
			</div>
			<div className="orders_information">
				{
					smallCards.map(card => (<ChefDashboardCardSmall key={card.id} {...card}/>))
				}
			</div>
			<div className="reviews_container">
				<div className="reviews_title bold_sofia">Reviews
					<div className="title_circle"></div>
				</div>
				<div className="reviews_text medium_sofia">See what your customers think</div>
			</div>
			<div className="started_container pulse">
				<div className="started_title bold_sofia">Getting Started</div>
				<div className="started_text regular_sofia">Let’s get you registered with your local food
					authority.
				</div>
			</div>
		</div>
	);
};

export default ChefDashboard;