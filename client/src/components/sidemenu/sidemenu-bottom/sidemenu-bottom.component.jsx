import React from 'react';

import './sidemenu-bottom.styles.scss';

const SideMenuBottom = () => (
	<div className="order_toggle">
		<div className="order_toggle_text medium_sofia hidden_text">
			Accepting orders
		</div>
		<label className="switch">
			<input type="checkbox"/>
			<span className="slider slider_sidemen round"/>
		</label>
	</div>
);

export default SideMenuBottom;