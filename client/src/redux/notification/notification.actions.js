import {NotificationActionTypes} from "./notification.types";

export const hideDashboardNotification = () => ({
	type: NotificationActionTypes.HIDE_DASHBOARD_NOTIFICATION,
	payload: false
});