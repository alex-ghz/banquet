import React from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { FaCamera, FaPoundSign } from "react-icons/all";
import { createStructuredSelector } from "reselect";


import './addDish.styles.scss';

import { selectChefId, selectCurrentUserMenuId } from "../../../redux/user/user.selectors";
import { selectActiveCategory, selectSelectedCategory } from "../../../redux/menu/menu.selectors";
import { fetchCollectionStartAsync } from "../../../redux/menu/menu.actions";
import Swal from "sweetalert2";

class AddDish extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			objectId: null,
			imageUrl: null,
			image: null,
			name: '',
			price: '',
			allergen: '',
			description: ''
		};

		this.handleImageUpload = this.handleImageUpload.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSaveDish = this.handleSaveDish.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	componentDidMount() {
		const { dishId } = this.props;

		if ( !!dishId === false ) {
			return;
		}


		axios.post('/menu/getDish', {
				 dishId: dishId
			 })
			 .then(response => response.data)
			 .then(data => data.dish)
			 .then(dish => {
				 this.setState({
					 objectId: dishId,
					 imageUrl: !!dish.imgURL ? dish.imgURL : null,
					 name: !!dish.name ? dish.name : null,
					 price: !!dish.price ? dish.price : null,
					 allergen: !!dish.allergens ? dish.allergens : null,
					 description: !!dish.description ? dish.description : ''
				 });
			 })
	}

	handleImageUpload(event) {
		this.setState({
			previousUrl: this.state.imageUrl,
			imageUrl: URL.createObjectURL(event.target.files[0]),
			image: event.target.files[0]
		}, () => {
			setTimeout(() => {
				const image = this.state.image;
				const form = new FormData();

				form.append('image', image, image.name);

				axios.post('/upload/image', form, { headers: { 'Content-Type': 'multipart/form-data' } })
					 .then(result => result.data)
					 .then(data => data.url)
					 .then(url => {
						 this.setState({
							 imageUrl: url,
							 image: null
						 });
					 })
					 .catch(err => {
						 this.setState({
							 imageUrl: this.state.previousUrl,
							 imageFile: null
						 });

						 Swal.fire({
							 icon: 'error',
							 title: 'Oops...',
							 text: err.response.data.err,
						 });
					 });
			}, 500);
		});
	}

	handleInputChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	handleCancel() {
		this.setState({
			objectId: null,
			imageUrl: null,
			image: null,
			name: '',
			price: '',
			allergen: '',
			description: ''
		});

		this.props.handleCancel();
	}

	handleSaveDish() {
		const formData = new FormData();

		formData.append("file", this.state.imageUrl);
		formData.append("dishId", this.state.objectId)
		formData.append("name", this.state.name);
		formData.append("price", this.state.price);
		formData.append("allergen", this.state.allergen);
		formData.append("description", this.state.description);
		formData.append("chefId", this.props.selectChefId);
		formData.append("categoryId", this.props.selectedCategory.category.objectId);

		axios.post('/menu/addDish', formData)
			 .then(result => {
				 let { fetchCollectionsStartAsync, menuId } = this.props;
				 fetchCollectionsStartAsync(menuId);

				 this.handleCancel();
			 });
	}

	render() {

		return (
			<div className="basic_popup_add">
				<div className="popup_add_inner">
					<div className="add_to_menu_popup">
						<div className="item_image_popup">
							<div className="item_image_tile medium_sofia">ITEM IMAGE</div>
							<div className="item_image_icon">
								<label htmlFor="imgFile">
									<FaCamera/>
									<input id="imgFile" className="imgFile" type="file"
										   onChange={ this.handleImageUpload }/>
								</label>
							</div>
							{
								this.state.imageUrl ? (
									<div className="item_image">
										<img src={ this.state.imageUrl } alt="plate"/>
									</div>
								) : null
							}

						</div>
						<div className="div_item_name_popup">
							<p className="item_name_popup medium_sofia">ITEM NAME</p>
							<input name="name" type="text" defaultValue={ this.state.name } onChange={ this.handleInputChange }
								   className="popup_item_name sb_sofia"/>
						</div>
						<div className="item_description_popup medium_sofia">ITEM PRICE (<FaPoundSign/>)
							<input name="price" type="number" defaultValue={ this.state.price } onChange={ this.handleInputChange }
								   className="popup_item_price sb_sofia"/>
						</div>
						<div className="item_description_popup">
							<p className="item_name_popup medium_sofia">DESCRIPTION</p>
							<input placeholder="" name="description" type="text" defaultValue={ this.state.description }
								   onChange={ this.handleInputChange }
								   className="popup_item_description sb_sofia"/>
						</div>
						<div className="item_allergen_popup">
							<div className="item_allergen_tile medium_sofia">ALLERGEN INFO</div>
							<div className="item_allergens_list">
								<input placeholder="" name="allergen" type="text" defaultValue={ this.state.allergen }
									   onChange={ this.handleInputChange }
									   className="popup_item_description sb_sofia"/>
							</div>
						</div>
						<div className="popup_add_save_btn medium_sofia" onClick={ this.handleSaveDish }>Save</div>
						<div className="popup_add_cancel_btn medium_sofia" onClick={ this.handleCancel }>Cancel</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	selectChefId: selectChefId,
	activeCategory: selectActiveCategory,
	selectedCategory: selectSelectedCategory,
	menuId: selectCurrentUserMenuId
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: menuId => dispatch(fetchCollectionStartAsync(menuId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDish);