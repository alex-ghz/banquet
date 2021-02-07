import MenuActionTypes from "./menu.types";
import axios from "axios";

export const fetchCollectionsStart = () => ({
	type: MenuActionTypes.FETCH_COLLECTION_START
});

export const fetchCollectionsSuccess = menuCategories => ({
	type: MenuActionTypes.FETCH_COLLECTION_SUCCESS,
	payload: menuCategories
});

export const fetchCollectionsFailure = errorMessage => ({
	type: MenuActionTypes.FETCH_COLLECTION_FAILURE,
	payload: errorMessage
});

export const setSelectedCategory = category => ({
	type: MenuActionTypes.SET_SELECTED_CATEGORY,
	payload: category
});

export const addNewCategory = category => ({
	type: MenuActionTypes.ADD_NEW_CATEGORY,
	payload: category
});

export const removeCategory = category => ({
	type: MenuActionTypes.REMOVE_CATEGORY,
	payload: category
});

export const fetchCollectionStartAsync = menuId => {
	return dispatch => {
		axios.post('/menu/getMenu', {
				 menuId: menuId
			 })
			 .then(result => result.data)
			 .then(result => {
				 dispatch(fetchCollectionsSuccess(result.menu));
			 })
			 .catch(error => dispatch(fetchCollectionsFailure(error)))
	}
}