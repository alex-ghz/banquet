import {createSelector} from "reselect";

const notification = state => state.notification;

export const getDashboardNotification = createSelector(
	[notification],
	(notification) => notification.dashboard
);