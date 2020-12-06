import React from 'react';
import {FaCamera} from "react-icons/all";

import './profile-image.styles.scss';

const ProfileImage = () => (
	<div>
		<div className="profile_section_border">
			<p className="first_profile_paragraph medium_sofia">MAIN PROFILE IMAGE</p>
			<p className="gs_paragraph regular_sofia">Choose a main profile Image (of your food, you and your food,
				where you cook!) that is high quality and represents the best of what you have to offer. This will be
				the first thing people see when they view your profile so make it count! For more tips on how to create
				a 5 star profile visit <span className="red_span">Chef’s Corner.</span></p>
		</div>
		<div className="profile_section_border">
			<p className="first_profile_paragraph medium_sofia p_other_color">MAIN PROFILE IMAGE</p>
			<div className="main_profile_img">
				<FaCamera/>
			</div>
		</div>
	</div>
);

export default ProfileImage;