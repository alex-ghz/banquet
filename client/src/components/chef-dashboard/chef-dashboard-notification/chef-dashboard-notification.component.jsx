import React from "react";

import './chef-dashboard-notification.styles.scss';

const ChefDashboardNotification = () => (
	<div className="notification">
		<div className="notification_text medium_sofia">
			Once verified, you’ll be able to begin accepting orders. Until then, why not explore the app and add your
			dishes to your menu! Happy Cooking!
		</div>
		<div className="close_notification_btn medium_sofia">
			Got it
		</div>
	</div>
);

export default ChefDashboardNotification;