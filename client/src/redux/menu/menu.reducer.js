import MenuActionTypes from "./menu.types";

const INITIAL_STATE = {
	categories: null,
	isFetching: false,
	errorMessage: undefined
};

const menuReducer = (state = INITIAL_STATE, action) => {
	switch ( action.type ) {
		case MenuActionTypes.FETCH_COLLECTION_START:
			return {
				...state,
				isFetching: true
			}
		case MenuActionTypes.FETCH_COLLECTION_SUCCESS:
			return {
				...state,
				isFetching: false,
				categories: action.payload
			}
		case MenuActionTypes.FETCH_COLLECTION_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			}
		default:
			return state;
	}
}

export default menuReducer;