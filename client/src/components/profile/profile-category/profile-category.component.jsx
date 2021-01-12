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
	}

	handleAddCategory() {
		this.setState({
			categories: [
				...this.state.categories,
				this.state.tempCategory
			],
			tempCategory: ""
		});
	}

	handleInputChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
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
						<div className="profile-category-div">
							<input placeholder="" type="text" defaultValue={ this.state.tempCategory } onChange={ this.handleInputChange } name="tempCategory" className="popup_category_name sb_sofia"/>
							<div className="addcat_btn_profile bold_sofia">Add category</div>
						</div>
						<div className="selected_categories">
							<div className="selected_category selected_category_profile bold_sofia">
								Caribbean
								<FaTimes className='x_btn_category'/>
							</div>
							<div className="selected_category selected_category_profile bold_sofia">
								Local produce
								<FaTimes className='x_btn_category'/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileCategory;