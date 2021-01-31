import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import './sidemenu-bottom.styles.scss';

import { selectUserId, selectChefAcceptingOrders, selectChefId } from "../../../redux/user/user.selectors";
import { setChef } from "../../../redux/user/user.actions";
import { createStructuredSelector } from "reselect";
import Swal from "sweetalert2";

class SideMenuBottom extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			acceptingOrders: false
		}

		this.handleLogout = this.handleLogout.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	componentDidMount() {
		this.setState({
			acceptingOrders: this.props.acceptingOrders
		})
	}

	handleLogout() {
		localStorage.clear();
		window.location.href = '/';
	}

	handleToggle() {
		let newValue = !this.state.acceptingOrders;

		axios.post('/settings/acceptingOrders', {
				 chefId: this.props.chefId,
				 newValue: newValue
			 })
			 .then(response => response.data)
			 .then(data => data.chef)
			 .then(chef => {
				 this.props.setChef(chef);
				 this.setState({
					 acceptingOrders: newValue
				 });
			 })
			 .catch(err => {
				 Swal.fire({
					 icon: 'error',
					 title: 'Oops...',
					 text: err.response.data.err,
				 });
			 });
	}

	render() {

		return (
			<div>
				<div className="order_toggle">
					<div className="order_toggle_text medium_sofia hidden_text">
						Accepting orders
					</div>
					<label className="switch">
						<input type="checkbox"
							   checked={ this.state.acceptingOrders }
							   onChange={ this.handleToggle }/>
						<span className="slider_menu round"/>
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
	userId: selectUserId,
	acceptingOrders: selectChefAcceptingOrders,
	chefId: selectChefId
});

const mapDispatchToProps = dispatch => ({
	setChef: chef => dispatch(setChef(chef))
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuBottom);