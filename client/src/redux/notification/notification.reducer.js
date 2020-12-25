import {NotificationActionTypes} from "./notification.types";

const INITIAL_STATE = {
	dashboard: true
};

const notificationReducer = (state = INITIAL_STATE, action) => {
	switch ( action.type ) {
		case NotificationActionTypes.HIDE_DASHBOARD_NOTIFICATION:
			return {
				...state,
				dashboard: action.payload
			}
		default:
			return state;
	}
}

export default notificationReducer;