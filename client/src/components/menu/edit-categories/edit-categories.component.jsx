import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { FaPlus, FaTrash } from "react-icons/all";
import axios from "axios";

import './edit-categories.styles.scss';

import EditCategoryInput from "../edit-category-input/edit-category-input.component";

import { selectMenuCategoriesNames, selectMenuCategories } from "../../../redux/menu/menu.selectors";
import { selectChefId, selectCurrentUserMenuId } from "../../../redux/user/user.selectors";
import { fetchCollectionStartAsync, addNewCategory, removeCategory } from "../../../redux/menu/menu.actions";
import Swal from "sweetalert2";


class EditCategories extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			categories: this.sortByKey(props.categories, 'index'),
			deletedCategories: []
		}

		this.handleAdd = this.handleAdd.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	sortByKey(array, key) {
		return array.sort(function (a, b) {
			var x = a[key];
			var y = b[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}

	handleAdd() {
		this.props.addNewCategory({
			name: '',
			index: this.state.categories.length,
			new: true
		});
	}

	handleChange(index, name) {
		let categories = this.props.categories;
		categories[index]['name'] = name;

		this.setState({
			categories: categories
		});
	}

	handleSave() {
		axios.post('/menu/saveCategories', {
				 menuId: this.props.menuId,
				 categories: this.state.categories,
				 deleted: this.state.deletedCategories,
				 chefId: this.props.chefId
			 })
			 .then(result => {
				 let { fetchCollectionsStartAsync, menuId } = this.props;
				 fetchCollectionsStartAsync(menuId);

				 this.handleCancel();
			 })
			 .catch(err => {
				 const text = !!err.response.data.err ? err.response.data.err : false;
				 const confirmation = !!err.response.data.confirmation;

				 if ( text === false ) {
					 Swal.fire({
						 icon: 'error',
						 title: 'Oops...',
						 text: 'Something went wrong. Please retry.',
					 });

					 let { fetchCollectionsStartAsync, menuId } = this.props;
					 fetchCollectionsStartAsync(menuId);

					 this.handleCancel();
				 } else {
					 if ( !confirmation ) {
						 Swal.fire({
							 icon: 'error',
							 title: 'Oops...',
							 text: text,
						 });

						 let { fetchCollectionsStartAsync, menuId } = this.props;
						 fetchCollectionsStartAsync(menuId);

						 this.handleCancel();
					 } else {
						 Swal.fire({
							 title: text,
							 showDenyButton: true,
							 confirmButtonText: `Delete dishes also`,
						 }).then((result) => {
							 /* Read more about isConfirmed, isDenied below */
							 if ( result.isConfirmed ) {
								 axios.post('/menu/saveCategories', {
										  menuId: this.props.menuId,
										  categories: this.state.categories,
										  deleted: this.state.deletedCategories,
										  chefId: this.props.chefId,
										  confirmed: true
									  })
									  .then(response => response.data)
									  .then(data => {
										  Swal.fire(
											  data.msg,
											  'Category deleted',
											  'success'
										  );

										  let { fetchCollectionsStartAsync, menuId } = this.props;
										  fetchCollectionsStartAsync(menuId);

										  this.handleCancel();
									  })
									  .catch(err => {
										  const text = !!err.response.data.err ? err.response.data.err : false;
										  Swal.fire({
											  icon: 'error',
											  title: 'Oops...',
											  text: text,
										  });

										  let { fetchCollectionsStartAsync, menuId } = this.props;
										  fetchCollectionsStartAsync(menuId);

										  this.handleCancel();
									  })
							 } else {
								 let { fetchCollectionsStartAsync, menuId } = this.props;
								 fetchCollectionsStartAsync(menuId);
							 }
						 })
					 }
				 }
			 })
	}

	handleCancel() {
		this.setState({
			categories: this.sortByKey(this.props.selectMenuCategories, 'index')
		});

		let { fetchCollectionsStartAsync, menuId } = this.props;
		fetchCollectionsStartAsync(menuId);

		this.props.handleCancel();
	}

	handleUpdateCategoriesList = () => {
		this.setState({
			categories: this.sortByKey(this.props.selectMenuCategories, 'index')
		});
	}

	handleDeleteCategory = (category) => {
		this.setState({
			deletedCategories: [...this.state.deletedCategories, category]
		}, () => {
			this.props.removeCategory(category);
		});
	}

	render() {
		let categories = this.props.categories.filter(category => !this.state.deletedCategories.includes(category.objectId));

		return (
			<div className="basic_popup_edit">
				<div className="popup_edit_inner">
					<div className="edit_category_popup">
						<div className="edit_category_scroll">
							{
								categories.map((category, index, arr) => <EditCategoryInput key={ index }
																							category={ category }
																							handleChange={ this.handleChange }
																							update={ this.handleUpdateCategoriesList }
																							deleteCategory={ this.handleDeleteCategory }/>)
							}
							<div className="popup_edit_add_btn" onClick={ this.handleAdd }>
								<FaPlus className='plus_icon_edit'/>
							</div>
							<div className="popup_edit_bottom">
								<div className="popup_edit_save_btn medium_sofia" onClick={ this.handleSave }>Save</div>
								<div className="popup_edit_cancel_btn medium_sofia" onClick={ this.handleCancel }>Cancel
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	chefId: selectChefId,
	selectCategoriesNames: selectMenuCategoriesNames,
	selectMenuCategories: selectMenuCategories,
	menuId: selectCurrentUserMenuId
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: menuId => dispatch(fetchCollectionStartAsync(menuId)),
	addNewCategory: category => dispatch(addNewCategory(category)),
	removeCategory: category => dispatch(removeCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategories);