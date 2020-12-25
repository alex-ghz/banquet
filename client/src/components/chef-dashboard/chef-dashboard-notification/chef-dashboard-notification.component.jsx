import React from "react";
import {connect} from "react-redux";

import './chef-dashboard-notification.styles.scss';
import { hideDashboardNotification } from "../../../redux/notification/notification.actions";

const ChefDashboardNotification = ({hideDashboardNotification}) => (
	<div className="notification">
		<div className="notification_text medium_sofia">
			Once verified, you’ll be able to begin accepting orders. Until then, why not explore the app and add your
			dishes to your menu! Happy Cooking!
		</div>
		<div className="close_notification_btn medium_sofia" onClick={hideDashboardNotification}>
			Got it
		</div>
	</div>
);

const mapDispatchToProps = dispatch => ({
	hideDashboardNotification: () => dispatch(hideDashboardNotification())
});

export default connect(null, mapDispatchToProps)(ChefDashboardNotification);