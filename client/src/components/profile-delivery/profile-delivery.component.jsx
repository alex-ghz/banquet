import React from 'react';
import {FaShoppingBasket, FaCheck, FaLocationArrow} from "react-icons/all";

import './profile-delivery.styles.scss';

const ProfileDelivery = () => (
	<div>
		<div className="profile_section_border">
			<p className="first_profile_paragraph medium_sofia">DELIVERY / COLLECTION OPTIONS</p>
			<div className="delivery_collection_div">
				<div className="profile_delivery_section regular_sofia">
					<FaShoppingBasket className='profile_icon'/>
					<div className="delivery_section_left_text">I am providing deliveries</div>
					<div className="check_div_profile">
						<FaCheck className='chkMarkProfile'/>
					</div>
				</div>
				<div className="delivery_colection_section_location medium_sofia">
					<span className="delivery_radius regular_sofia">Set delivery radius</span>
					<div className="delivery_collection_select_inner">
						<select className="delivery_location regular_sofia">
							<option value="5mi">5 miles</option>
							<option value="10mi">10 miles</option>
							<option value="15mi">15 miles</option>
							<option value="20mi">20 miles</option>
						</select>
						<div className="delivery_section_right_text">
							<FaLocationArrow className='locarr'/>
							From my location
						</div>
					</div>
				</div>
			</div>
			<div className="delivery_collection_div">
				<div className="profile_collection_section regular_sofia">
					<FaShoppingBasket className='profile_icon'/>
					<div className="delivery_section_left_text">I am available for collections</div>
					<div className="check_div_profile2">
						<FaCheck className='chkMarkProfile'/>
					</div>
				</div>
				<div className="delivery_colection_section_location medium_sofia">
					<span className="delivery_radius regular_sofia">Set delivery radius</span>
					<div className="delivery_collection_select_inner">
						<select className="delivery_location regular_sofia">
							<option value="5mi">5 miles</option>
							<option value="10mi">10 miles</option>
							<option value="15mi">15 miles</option>
							<option value="20mi">20 miles</option>
						</select>
						<div className="delivery_section_right_text">
							<FaLocationArrow className='locarr'/>
							From my location
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default ProfileDelivery;