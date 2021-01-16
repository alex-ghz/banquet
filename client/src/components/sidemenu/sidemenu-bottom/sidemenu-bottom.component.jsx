import React from 'react';
import { connect } from 'react-redux';

import './sidemenu-bottom.styles.scss';

import { selectUserId } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

class SideMenuBottom extends React.Component {

	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		localStorage.clear();
		window.location.href = '/';

		// const { userId } = this.props;
		//
		// axios.post('/api/logout', {
		// 	userId: userId
		// }).then(result => {
		// 	console.log(result);
		//
		// 	localStorage.clear();
		// 	window.location.href = '/';
		// })
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
				<div className="log-out-side sb_sofia" onClick={ this.handleLogout }>
					Log out
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	userId: selectUserId
});

export default connect(mapStateToProps)(SideMenuBottom);