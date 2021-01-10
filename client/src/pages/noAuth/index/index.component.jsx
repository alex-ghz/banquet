import React from 'react';

import Main1 from '../../../assets/images/main-1.jpg';
import Main2 from '../../../assets/images/main-2.jpg'
import Main3 from '../../../assets/images/main-3.jpg'

import './index.styles.scss';

const IndexPage = () => (
	<div>
		<div className="index_content_section">
			<div className="index_hero bold_sofia">
				<img className="index-hero-img" src={ Main1 } alt=""/>
				<div className="index_hero_text">
					Home cooked meals made by local chefs - on demand.
				</div>
			</div>
			<p className="text_par first_text_par regular_sofia">
				Download the app now and discover flavours of the world on your doorstep.
			</p>
			<div className="banquet_home_button first_btn_home bold_sofia">
				Go to app store
			</div>
		</div>
		<div className="index_logo_section">
			<div className="index_logo_container">
				<div className="index_logo_border"/>
				<p className="index_logo_text bold_sofia">Discover an abundance of tasty dishes on your doorstep</p>
			</div>
			<div className="index_logo_container">
				<div className="index_logo_border"/>
				<p className="index_logo_text bold_sofia">Save money eating from local chefs</p>
			</div>
			<div className="index_logo_container">
				<div className="index_logo_border"/>
				<p className="index_logo_text bold_sofia">Unlimited opportunity as a Banquet Chef - earn as you cook</p>
			</div>
		</div>
		<div className="index_third_section">
			<div className="index_third_content">
				<div className="index_third_title bold_sofia">
					See what we’re doing at Banquet
				</div>
				<p className="text_par regular_sofia">
					Find out more about our journey creating the best home cooking marketplace to connect outstanding
					chef’s and their dishes with their local communities.
				</p>
				<div className="banquet_home_button second_btn_home bold_sofia">
					Our Story
				</div>
			</div>
			<div className="index_third_img">
				<img className="index-third-img" src={ Main2 } alt=""/>
			</div>
		</div>
		<div className="index_content_section index_last_content">
			<div className="index_last bold_sofia">
				<img className="index-last-img" src={ Main3 } alt=""/>
				<div className="index_last_text">
					How joining Banquet is changing lives
				</div>
				<div className="banquet_home_button last_btn_home bold_sofia">
					Testimonials
				</div>
			</div>
		</div>
	</div>
);

export default IndexPage;