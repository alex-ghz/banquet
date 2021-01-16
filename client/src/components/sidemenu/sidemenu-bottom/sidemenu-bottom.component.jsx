import React from 'react';

import './sidemenu-bottom.styles.scss';

class SideMenuBottom extends React.Component {

	handleLogout() {
		localStorage.clear();
		window.location.href = '/';
	}

	render() {

		return (
			<div>
				<div className="order_toggle">
					<div className="order_toggle_text medium_sofia hidden_text">
						Accepting orders
					</div>
					<label className="switch">
						<input type="checkbox"/>
						<span className="slider slider_sidemen round"/>
					</label>
				</div>
				<div className="log-out-side sb_sofia">
					Log out
				</div>
			</div>
		);
	}
}

export default SideMenuBottom;