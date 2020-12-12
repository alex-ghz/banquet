import { PageActionTypes } from "./page.types";

const INITIAL_STATE = {
	currentPage: 'home'
};

const pageReducer = (state = INITIAL_STATE, action) => {
	switch ( action.type ) {
		case PageActionTypes.SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.payload
			};
		default:
			return state;
	}
}

export default pageReducer;