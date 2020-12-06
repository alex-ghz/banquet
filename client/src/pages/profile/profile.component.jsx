import React from 'react';

import './profile.styles.scss';

import ProfileImage from "../../components/profile-image/profile-image.component";
import ProfileDescription from "../../components/profile-description/profile-description.component";
import ProfileDelivery from "../../components/profile-delivery/profile-delivery.component";
import ProfileCategory from "../../components/profile-category/profile-category.component";

class Profile extends React.Component {

	render() {
		return (
			<div className='profile_section'>
				<div className="profile_section_title bold_sofia">
					My Chef Profile
				</div>
				<div className='profile_section_inner'>
					<ProfileImage/>
					<ProfileDescription/>
					<ProfileDelivery/>
					<ProfileCategory/>
					<div className="last_section_profile">
						<div className="profile_updated_last medium_sofia">Last Updated on 12/05/2020</div>
						<div className="save_btn_profile bold_sofia">Save changes</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;