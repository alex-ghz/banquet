import React from 'react';

import './chef-corner.styles.scss';

const ChefCorner = () => (
	<div>
		<div className="home_chef_title bold_sofia">
			CHEF'S CORNER
		</div>
		<div className="see_more_btn medium_sofia">
			See more
		</div>
		<div className="home_chef_inner">
			<div className="chef_container chef_container_pulse pulse">
				<div className="chef_title bold_sofia">Getting Started</div>
				<div className="started_text chef_text regular_sofia">Let’s get you registered with your
					local food authority.
				</div>
			</div>
			<div className="chef_container">
				<div className="chef_title bold_sofia">Eco-friendly tips</div>
				<div className="started_text chef_text regular_sofia">How to be an eco-friendly chef.</div>
			</div>
			<div className="chef_container">
				<div className="chef_title bold_sofia">Time to shine</div>
				<div className="started_text chef_text regular_sofia">How to make your dishes stand out.
				</div>
			</div>
			<div className="chef_container">
				<div className="chef_title chef_title_second bold_sofia">Kitchen Tips</div>
				<div className="started_text chef_text chef_text_second regular_sofia">Top tips for keeping
					your kitchen in winning form.
				</div>
			</div>
			<div className="chef_container">
				<div className="chef_title chef_title_second bold_sofia">Choose Locals</div>
				<div className="started_text chef_text chef_text_second regular_sofia">Empower your
					community through small decisions.
				</div>
			</div>
			<div className="chef_container">
				<div className="chef_title chef_title_second bold_sofia">Quick Measures</div>
				<div className="started_text chef_text chef_text_second regular_sofia">A handy measurement
					converter.
				</div>
			</div>
		</div>
	</div>
);

export default ChefCorner;