import React from 'react';
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/all";
import { createStructuredSelector } from "reselect";
import { connect } from 'react-redux';
import Swal from "sweetalert2";
import axios from "axios";

import './edit-category-input.styles.scss';

import { selectChefId, selectCurrentUserMenuId } from "../../../redux/user/user.selectors";
import { selectMenuCategories } from "../../../redux/menu/menu.selectors";
import { fetchCollectionsSuccess, fetchCollectionStartAsync } from "../../../redux/menu/menu.actions";

class EditCategoryInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: props.category.name,
			index: props.category.index,
			id: props.category.objectId,
			showItem: !!props.category.new
		};

		this.handleOpenDetails = this.handleOpenDetails.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleOpenDetails() {
		this.setState({
			showItem: !this.state.showItem
		});
	}

	handleChange(e) {
		this.props.handleChange(this.state.index, e.target.value);
	}

	updateCategories = () => {
		let { fetchCollectionsStartAsync, menuId, update } = this.props;
		fetchCollectionsStartAsync(menuId);
		update();
	}

	handleDeleteCategory = (index) => {
		const { chefId, menuId } = this.props;
		const categoryId = this.state.id;

		axios.post('/menu/deleteCategory', {
				 chefId: chefId,
				 categoryId: categoryId,
				 menuId: menuId
			 })
			 .then(response => response.data)
			 .then(data => {
				 this.updateCategories(categoryId);
				 Swal.fire(
					 data.msg,
					 '',
					 'success'
				 );
			 })
			 .catch(err => {
				 console.log(err);
				 const text = !!err.response.data.err ? err.response.data.err : false;
				 const confirmation = !!err.response.data.confirmation;

				 if ( text === false ) {
					 Swal.fire({
						 icon: 'error',
						 title: 'Oops...',
						 text: 'Something went wrong. Please retry.',
					 });
				 } else {
					 if ( !confirmation ) {
						 Swal.fire({
							 icon: 'error',
							 title: 'Oops...',
							 text: text,
						 });
					 } else {
						 Swal.fire({
							 title: text,
							 showDenyButton: true,
							 confirmButtonText: `Delete dishes also`,
						 }).then((result) => {
							 /* Read more about isConfirmed, isDenied below */
							 if ( result.isConfirmed ) {
								 axios.post('/menu/deleteCategory', {
										  chefId: chefId,
										  categoryId: categoryId,
										  menuId: menuId,
										  categoryIndex: index
									  })
									  .then(response => response.data)
									  .then(data => {
										  this.updateCategories(categoryId);
										  Swal.fire(
											  data.msg,
											  '',
											  'success'
										  );
									  })
									  .catch(err => {
										  const text = !!err.response.data.err ? err.response.data.err : false;
										  Swal.fire({
											  icon: 'error',
											  title: 'Oops...',
											  text: text,
										  });
									  })
							 }
						 })
					 }
				 }
			 });

	}

	render() {

		return (
			<div className="editCategoryRow">
				<div className="popup_menu_title">
					<p className="category_menu_title medium_sofia">MENU TITLE - { this.state.index + 1 }</p>
					{
						this.state.showItem ? (
								<div>
									<FaChevronUp className='arrow_close_menu_details' onClick={ this.handleOpenDetails }/>
									<input placeholder="" type="text" defaultValue={ this.state.name }
										   className="input_menu_title sb_sofia" onChange={ this.handleChange }/>
								</div>
							)
							:
							<FaChevronDown className='arrow_open_menu_details' onClick={ this.handleOpenDetails }/>
					}
				</div>
				<FaTrash className='trash_icon_btn' onClick={ () => {
					this.handleDeleteCategory(this.state.index);
				} }/>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	chefId: selectChefId,
	menuId: selectCurrentUserMenuId,
	categories: selectMenuCategories
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: menuId => dispatch(fetchCollectionStartAsync(menuId))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryInput);