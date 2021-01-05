import React from 'react';

import './menu-card.styles.scss';
import { FaPencilAlt } from "react-icons/all";

const MenuCard = ({dish}) => (
	<div className="product_ex">
		<div className="product_image">
			<img src={dish.imgURL}/>
		</div>
		<div className="edit_product_btn medium_sofia">
			<FaPencilAlt className='pencil_icon'/>
			Edit
		</div>
		<div className="product_name sb_sofia">{dish.name}</div>
		{/*<div className="product_time regular_sofia">*/}
		{/*	<i className="fa fa-clock-o" aria-hidden="true"/> 15 - 20 mins*/}
		{/*</div>*/}
		<div className="product_description regular_sofia">
			{dish.description}
		</div>
		<div className="product_price sb_sofia">£{dish.price}</div>
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

export default MenuCard;