import MenuActionTypes from "./menu.types";

const INITIAL_STATE = {
	categories: null,
	isFetching: false,
	errorMessage: undefined,
	selectedCategory: undefined,
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
				categories: action.payload,
				selectedCategory: action.payload[0]
			}
		case MenuActionTypes.FETCH_COLLECTION_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload
			}
		case MenuActionTypes.SET_SELECTED_CATEGORY:
			return {
				...state,
				selectedCategory: action.payload
			}
		case MenuActionTypes.ADD_NEW_CATEGORY:
			return {
				...state,
				categories: [
					...state.categories,
					{
						category: action.payload
					}
				]
			}
		default:
			return state;
	}
}

export default menuReducer;