import {createSelector} from "reselect";

const selectPage = state => state.page;

export const selectCurrentPage = createSelector(
	[selectPage],
	(page) => page.currentPage
);