import React from 'react';

import MenuCard from "../menu-card/menu-card.component";

class MenuSection extends React.Component {

	render() {
		return (
			<div className='menu_products_section'>
				<div className="menu_products_section_inner">
					<div className="menu_products_title bold_sofia">Menu</div>
					<div className="edit_categories_btn medium_sofia">Edit Categories</div>
					<div className="menu_products_categories">
						<div className="product_category mains_category sb_sofia">MAINS</div>
						<div className="product_category sides_category sb_sofia">SIDES</div>
						<div className="product_category desserts_category sb_sofia">DESSERTS</div>
						<div className="product_category drinks_category sb_sofia">DRINKS</div>
						<div className="product_category extras_catrgory sb_sofia">EXTRAS</div>
					</div>
					<div className="categories_bar"/>
					<div className="add_menu_item_btn medium_sofia">Add menu Item</div>
					<div className="menu_products_inner">
						<MenuCard/>
						<MenuCard/>
						<MenuCard/>
						<MenuCard/>
						<MenuCard/>
						<MenuCard/>
						<MenuCard/>
					</div>
				</div>
			</div>
		);
	}
}

export default MenuSection;