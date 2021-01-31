import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { FaPlus, FaTrash } from "react-icons/all";
import axios from "axios";

import './edit-categories.styles.scss';

import EditCategoryInput from "../edit-category-input/edit-category-input.component";

import { selectMenuCategoriesNames, selectMenuCategories } from "../../../redux/menu/menu.selectors";
import { selectCurrentUserMenuId } from "../../../redux/user/user.selectors";
import { fetchCollectionStartAsync } from "../../../redux/menu/menu.actions";


class EditCategories extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			categories: this.sortByKey(props.selectMenuCategories, 'index')
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
		this.setState({
			categories: [
				...this.state.categories,
				{
					name: '',
					index: this.state.categories.length,
					new: true
				}
			]
		});
	}

	handleChange(index, name) {
		let categories = this.state.categories;
		categories[index]['name'] = name;

		this.setState({
			categories: categories
		});
	}

	handleSave() {
		axios.post('/menu/saveCategories', {
				 menuId: this.props.menuId,
				 categories: this.state.categories
			 })
			 .then(result => {
				 let { fetchCollectionsStartAsync, menuId } = this.props;
				 fetchCollectionsStartAsync(menuId);

				 this.handleCancel();
			 });
	}

	handleCancel() {
		this.setState({
			categories: this.sortByKey(this.props.selectMenuCategories, 'index')
		});

		this.props.handleCancel();
	}

	render() {
		let categories = this.state.categories;

		return (
			<div className="basic_popup_edit">
				<div className="popup_edit_inner">
					<div className="edit_category_popup">
						<div className="edit_category_scroll">
							{
								categories.map((category, index, arr) => <EditCategoryInput key={ index }
																							category={ category }
																							handleChange={ this.handleChange }/>)
							}
							{/*<FaTrash className='trash_icon_btn'/>*/ }
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
	selectCategoriesNames: selectMenuCategoriesNames,
	selectMenuCategories: selectMenuCategories,
	menuId: selectCurrentUserMenuId
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: menuId => dispatch(fetchCollectionStartAsync(menuId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategories);