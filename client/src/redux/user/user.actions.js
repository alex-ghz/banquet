import {UserActionTypes} from './user.types';

export const setCurrentUser = user => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user
});

export const setChefSettings = settings => ({
	type: UserActionTypes.SET_CHEF_SETTINGS,
	payload: settings
});

export const setChefProfileImg = photoUrl => ({
	type: UserActionTypes.SET_CHEF_PROFILE_IMG,
	payload: photoUrl
});

export const setChefDescription = description => ({
	type: UserActionTypes.SET_CHEF_DESCRIPTION,
	payload: description
});

export const setChef = chef => ({
	type: UserActionTypes.SET_CHEF,
	payload: chef
});

export const disableNewPopup = () => ({
	type: UserActionTypes.DISABLE_NEW_POPUP
});