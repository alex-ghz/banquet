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

export const fetchCollectionStartAsync = menuId => {
	return dispatch => {
		axios.post('/menu/getMenu', {
				 menuId: menuId
			 })
			 .then(result => result.data)
			 .then(result => {
				 dispatch(fetchCollectionsSuccess(result));
			 })
			 .catch(error => dispatch(fetchCollectionsFailure(error)))
	}
}