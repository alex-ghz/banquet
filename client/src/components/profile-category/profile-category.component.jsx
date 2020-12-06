import React from 'react';
import { FaSearch, FaTimes } from "react-icons/all";

import './profile-category.styles.scss';

const ProfileCategory = () => (
	<div>
		<div className="profile_section_border">
			<div className="profile_section_edit">
				<p className="first_profile_paragraph medium_sofia">CHEF CATEGORIES</p>
				<p className="edit_btn_profile medium_sofia">Edit</p>
			</div>
			<p className="gs_paragraph regular_sofia">Choose up to 4 categories that represent the food you offer.</p>
		</div>
		<div className="profile_section_border">
			<div className="item_category_popup category_profile">
				<p className="item_category_title_popup medium_sofia">CATEGORY</p>
				<input placeholder="" type="text" defaultValue="" className="popup_category_name sb_sofia"/>
				<FaSearch className='search_icon'/>
				<div className="available_category available_category_profile bold_sofia">Organic</div>
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

export default ProfileCategory;