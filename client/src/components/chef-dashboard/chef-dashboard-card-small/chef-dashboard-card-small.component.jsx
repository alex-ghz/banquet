import React from 'react';

import './chef-dashboard-card-small.styles.scss';

const ChefDashboardCardSmall = ({ title, value, description, hasNotfication }) => (
	<div className="order_active">
		<div className="information_title medium_sofia">
			{ title }
			{
				hasNotfication ?
					<div className="title_square">i</div>
					: null
			}
		</div>
		<div className="information_value sb_sofia">{ value }</div>
		<div className="information_final sb_sofia">{ description }</div>
	</div>
);

export default ChefDashboardCardSmall;