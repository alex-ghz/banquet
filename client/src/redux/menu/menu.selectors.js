import {createSelector} from "reselect";

const selectMenu = state => state.menu;

export const selectIsCollectionFetching = createSelector(
	[selectMenu],
	menu => menu.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
	[selectMenu],
	menu => !!menu.categories
);


