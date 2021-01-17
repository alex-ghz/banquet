import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import axios from "axios";

import './menu-card.styles.scss';
import { FaPencilAlt } from "react-icons/all";
import { selectCurrentUserMenuId } from "../../../redux/user/user.selectors";
import { fetchCollectionStartAsync } from "../../../redux/menu/menu.actions";

class MenuCard extends React.Component {

	constructor(props) {
		super(props);

		this.handleEditDish = this.handleEditDish.bind(this);
		this.handleDishAvailability = this.handleDishAvailability.bind(this);
	}

	handleEditDish() {
		const { dish, editDish } = this.props;
		editDish(dish.objectId);
	}

	handleDishAvailability() {
		let { menuId, dish, fetchCollectionsStartAsync } = this.props;

		axios.post('/menu/dishAvailability', {
				 dishId: dish.objectId,
				 value: !dish.available
			 })
			 .then(response => {
				 fetchCollectionsStartAsync(menuId);
			 })
	}

	render() {
		const { dish } = this.props;

		return (
			<div className="product_ex">
				<div className="product_image">
					<img src={ dish.imgURL } alt="Dish"/>
				</div>
				<div className="edit_product_btn medium_sofia" onClick={ this.handleEditDish }>
					<FaPencilAlt className='pencil_icon'/>
					Edit
				</div>
				<div className="product_name sb_sofia">{ dish.name }</div>
				<div className="product_description regular_sofia">
					{ dish.description }
				</div>
				<div className="product_price sb_sofia">£{ dish.price }</div>
				<div className="order_toggle_menu">
					<div className="order_toggle_text medium_sofia">
						Item available
					</div>
					<label className="switch">
						<input type="checkbox" defaultChecked={ dish.available } onChange={ this.handleDishAvailability }/>
						<span className="slider_menu round"/>
					</label>
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	menuId: selectCurrentUserMenuId
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: menuId => dispatch(fetchCollectionStartAsync(menuId))
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuCard);