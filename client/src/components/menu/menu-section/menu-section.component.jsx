import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import MenuCard from "../menu-card/menu-card.component";
import EditCategories from "../edit-categories/edit-categories.component";
import AddDish from "../addDish/addDish.component";

import {
	selectMenuCategoriesNames,
	selectMenuCategories,
	selectMenuCategoryFull,
	selectActiveCategoryDishes
} from "../../../redux/menu/menu.selectors";
import { setSelectedCategory } from "../../../redux/menu/menu.actions";

class MenuSection extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			displayEditCategories: false,
			displayAddDish: false,
			categories: []
		}

		this.handleEditCategories = this.handleEditCategories.bind(this);
		this.handleSectionClick = this.handleSectionClick.bind(this);
		this.handleAddDish = this.handleAddDish.bind(this);
	}

	handleEditCategories() {
		this.setState({
			displayEditCategories: !this.state.displayEditCategories
		});
	}

	handleAddDish() {
		this.setState({
			displayAddDish: !this.state.displayAddDish
		})
	}

	handleSectionClick(event) {
		let categoryIndex = this.state.categories[event.target.innerHTML.toLowerCase()];

		this.props.setSelectedCategory(this.props.categoriesFull[categoryIndex]);
	}

	render() {
		const menuCategories = this.props.categories;

		menuCategories.forEach(category => {
			if ( category.name ) {
				this.state.categories[category.name.toLowerCase()] = category.index;
			}
		});

		return (
			<div className='menu_products_section'>
				<div className="menu_products_section_inner">
					<div className="menu_products_title bold_sofia">Menu</div>
					<div className="edit_categories_btn medium_sofia" onClick={ this.handleEditCategories }>Edit
						Categories
					</div>
					<div className="menu_products_categories">
						{
							menuCategories.map(category => {
								if ( category.name ) {
									return (
										<div onClick={ this.handleSectionClick }
											 key={ category.name + Math.floor(Math.random() * Math.floor(100)) }
											 className="product_category mains_category sb_sofia">{ category.name.toUpperCase() }</div>
									)
								}
							})
						}
						{/*{*/ }
						{/*	menuCategories ?*/ }
						{/*		menuCategories.map(category => {*/ }
						{/*			if ( category ) {*/ }
						{/*				return (*/ }
						{/*					<div key={ category + Math.floor(Math.random() * Math.floor(100)) }*/ }
						{/*						 className="product_category mains_category sb_sofia">{ category.toUpperCase() }</div>*/ }
						{/*				);*/ }
						{/*			}*/ }
						{/*		})*/ }
						{/*		: null*/ }

					</div>
					<div className="categories_bar"/>
					<div className="add_menu_item_btn medium_sofia" onClick={ this.handleAddDish }>Add menu Item</div>
					<div className="menu_products_inner">
						{
							this.props.dishes.map(dish => <MenuCard key={ dish.objectId } dish={ dish }/>)
						}
					</div>
				</div>
				{
					this.state.displayEditCategories ?
						<EditCategories handleCancel={ this.handleEditCategories }/> : null
				}
				{
					this.state.displayAddDish ? <AddDish handleCancel={ this.handleAddDish }/> : null
				}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	selectCategories: selectMenuCategoriesNames,
	categories: selectMenuCategories,
	categoriesFull: selectMenuCategoryFull,
	dishes: selectActiveCategoryDishes
});

const mapDispatchToProps = dispatch => ({
	setSelectedCategory: category => dispatch(setSelectedCategory(category))
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuSection);