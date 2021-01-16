import React from 'react';

import './menu-card.styles.scss';
import { FaPencilAlt } from "react-icons/all";

class MenuCard extends React.Component {

	constructor(props) {
		super(props);

		this.handleEditDish = this.handleEditDish.bind(this);
	}

	handleEditDish() {
		const { dish, editDish } = this.props;
		editDish(dish.objectId);
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
						<input type="checkbox"/>
						<span className="slider_menu round"/>
					</label>
				</div>
			</div>
		);
	}
}

export default MenuCard;