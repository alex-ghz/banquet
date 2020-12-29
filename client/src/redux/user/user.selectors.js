import {createSelector} from "reselect";

const selectUser = state => state.user;

export const selectCurrentUser = createSelector(
	[selectUser],
	(user) => user.currentUser
);

export const selectUserSettings = createSelector(
	[selectUser],
	(user) => user.settings
);

export const selectChefSettings = createSelector(
	[selectCurrentUser],
	(user) => user.chefSettings
);

export const selectChef = createSelector(
	[selectCurrentUser],
	(user) => user.chef
);