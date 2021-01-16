import React from 'react';
import { FaSearch, FaTimes } from "react-icons/all";

import './profile-category.styles.scss';

class ProfileCategory extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			categories: [],
			tempCategory: ""
		}

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleAddCategory = this.handleAddCategory.bind(this);
		this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
	}

	componentDidMount() {
		const state = this.props.state;

		this.setState({
			categories: state
		});
	}

	handleAddCategory() {
		this.setState({
			categories: [
				...this.state.categories,
				this.state.tempCategory
			],
			tempCategory: ""
		}, this.updateParent);
	}

	handleInputChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleRemoveCategory(categoryName) {
		this.setState({
			categories: this.state.categories.filter(category => category !== categoryName)
		}, this.updateParent);
	}

	updateParent() {
		this.props.handleChange("categories", this.state.categories);
	}

	render() {

		return (
			<div>
				<div className="profile_section_border">
					<div className="profile_section_edit">
						<p className="first_profile_paragraph medium_sofia">CHEF CATEGORIES</p>
					</div>
					<p className="gs_paragraph regular_sofia">Choose up to 4 categories that represent the food you offer.</p>
				</div>
				<div className="profile_section_border">
					<div className="item_category_popup category_profile">
						<p className="item_category_title_popup medium_sofia">CATEGORY</p>
						{
							this.state.categories.length < 4 ?
								<div className="profile-category-div">
									<input placeholder="" type="text" value={ this.state.tempCategory } onChange={ this.handleInputChange } name="tempCategory"
										   className="popup_category_name sb_sofia"/>
									<div className="addcat_btn_profile bold_sofia" onClick={ this.handleAddCategory }>Add category</div>
								</div>
								: null
						}
						<div className="selected_categories">
							{
								this.state.categories.map(category => (
									<div key={ category } className="selected_category selected_category_profile bold_sofia">
										<span className="category_cap">
										{ category }
										</span>
										<FaTimes className='x_btn_category' onClick={ () => this.handleRemoveCategory(category) }/>
									</div>
								))
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileCategory;