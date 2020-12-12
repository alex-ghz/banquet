import {PageActionTypes} from "./page.types";

export const setCurrentPage = page => ({
	type: PageActionTypes.SET_CURRENT_PAGE,
	payload: page
});