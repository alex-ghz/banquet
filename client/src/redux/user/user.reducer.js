import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
	currentUser: null
};

const userReducer = (state = INITIAL_STATE, action) => {
	switch ( action.type ) {
		case UserActionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload
			};
		case UserActionTypes.SET_CHEF_SETTINGS:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					chefSettings: action.payload
				}
			}
		case UserActionTypes.SET_CHEF_PROFILE_IMG:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					chef: {
						...state.currentUser.chef,
						profilePhotoURL: action.payload
					}
				}
			}
		case UserActionTypes.SET_CHEF_DESCRIPTION:
			return {
				...state,
				currentUser: {
					...state.currentUser,
					chef: {
						...state.currentUser.chef,
						description: action.payload
					}
				}
			}
		default:
			return state;
	}
};

export default userReducer;