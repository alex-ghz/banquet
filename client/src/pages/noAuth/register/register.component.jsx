import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from "axios";

import LoginBackground from '../../../assets/images/signupLogin.jpg'

import './register.styles.scss';

import { setCurrentUser } from "../../../redux/user/user.actions";

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			password: '',
			phoneNo: '',
			err: null
		};
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit = async () => {
		const { setCurrentUser } = this.props;
		let { name, email, password, phoneNo } = this.state;

		axios.post('/api/register', { email: email, password: password, name: name, phoneNo: phoneNo })
			 .then((response) => response.data)
			 .then((user) => {
				 setCurrentUser(user);
			 })
			 .catch((err) => {
				 console.log('on error');
				 console.log(err);
			 })
	}

	render() {

		return (
			<div className="login-page">
				<img src={ LoginBackground } alt=""/>
				<div className="login-page-inner">
					<div className="left-content">
						<div className="login_page_title bold_sofia">Earn from your kitchen today.</div>
						<div className="login_page_text bold_sofia">Sell your home cooked dishes to your local community
							and earn an income on your own terms.
						</div>
					</div>
					<div className="right-content">
						<div className="right-con-inner">
							<div className="login-buttons">
								<Link to="/register">
									<div className="signup-btn sb_sofia btn_underline">Sign up</div>
								</Link>
								<Link to="/login">
									<div className="login-btn sb_sofia">Log In</div>
								</Link>
							</div>
							<p className="input_name medium_sofia">Name</p>
							<input type="text" className="first_name_login medium_sofia" placeholder="User Name"
								   name="name" onChange={ this.handleChange }/>
							<p className="input_name medium_sofia">Email</p>
							<input type="text" className="email_address_login medium_sofia"
								   placeholder="User1@email.com" name="email" onChange={ this.handleChange }/>
							<p className="input_name medium_sofia">Phone Number</p>
							<input type="number" className="phone_number medium_sofia" placeholder="+44"
								   name="phoneNo" onChange={ this.handleChange }/>
							<p className="sch-msg medium_sofia">Once signed up, we’ll schedule a welcome call with you
								to onboard you onto the dashboard.</p>
							<p className="input_name medium_sofia">Password</p>
							<input type="password" className="password_login medium_sofia" placeholder="Password"
								   name="password" onChange={ this.handleChange }/>
							<div className="signin-btn sb_sofia" onClick={ this.handleSubmit }>
								Sign Up
							</div>
							<p className="privacy_policy medium_sofia">By continuing you agree to our <span
								className="pp_color">T&amp;Cs.</span> You can also have a look at our <span
								className="pp_color">Privacy Policy.</span></p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchProps)(Register);