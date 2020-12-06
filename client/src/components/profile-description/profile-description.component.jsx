import React from 'react';

import './profile-description.styles.scss';

const ProfileDescription = () => (
	<div>
		<div className="profile_section_border">
			<p className="first_profile_paragraph medium_sofia">CHEF DESCRIPTION</p>
			<p className="gs_paragraph regular_sofia">This is a chance to tell people who you are, what you’re creating
				and what you love about it (favourite ingredients to cook with, an especially good dish…) Let people get
				to know you as a Banquet Chef in 500 characters or less. Show off!</p>
		</div>
		<div className="profile_section_border">
			<div className="profile_section_edit">
				<p className="first_profile_paragraph medium_sofia p_other_color">MY CHEF DESCRIPTION</p>
				<p className="edit_btn_profile medium_sofia">Edit</p>
			</div>
			<textarea className="chef_description_text regular_sofia" placeholder="Hello! I am..."/>
		</div>
	</div>
);

export default ProfileDescription;