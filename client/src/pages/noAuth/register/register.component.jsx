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
			err: []
		};
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit = async () => {
		const { setCurrentUser } = this.props;
		let { name, email, password, phoneNo } = this.state;

		this.setState({ err: [] }, () => {
			this.validate()
				.then(response => {
					this.setState({
						err: response.filter(value => !!value)
					}, () => {
						if ( this.state.err.length === 0 ) {
							axios.post('/api/register', {
									 email: email,
									 password: password,
									 name: name,
									 phoneNo: phoneNo
								 })
								 .then((response) => response.data)
								 .then((user) => {
									 setCurrentUser(user);
								 })
								 .catch((err) => {
									 this.setState({
										 err: [err.response.data.msg]
									 });
								 })
						}
					});
				});
		});
	}

	validate() {
		return new Promise(resolve => {
			const { name, email, password, phoneNo } = this.state;

			let promises = [];

			promises.push(new Promise(resolve1 => {
				let reg = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
				if ( !reg.test(password) ) {
					resolve1('Password not strong enough!');
				} else {
					resolve1();
				}
			}));

			promises.push(new Promise(resolve2 => {
				let emailReg = new RegExp("^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\\]?)$")
				if ( !emailReg.test(email) ) {
					resolve2('Email not valid!');
				} else {
					resolve2();
				}
			}));

			promises.push(new Promise(resolve3 => {
				if ( name.trim() === '' ) {
					resolve3('Name is not valid!');
				} else {
					resolve3();
				}
			}));

			promises.push(new Promise(resolve4 => {
				if ( phoneNo.trim() === '' ) {
					resolve4('Phone number is not valid!');
				} else {
					resolve4();
				}
			}));

			Promise.all(promises)
				   .then(values => {
					   resolve(values);
				   })
		});
	}

	render() {

		return (
			<div className="login-page">
				<img className="login-page-img" src={ LoginBackground } alt=""/>
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
							{
								!!this.state.err.length ?
									<div
										className="privacy_policy errMsg">{ this.state.err.map(err => (
										<p className="errP" key={ err }>{ err }</p>)) }</div>
									: null
							}
							<p className="privacy_policy medium_sofia">By continuing you agree to our <Link
								to="/terms-and-conditions"><span
								className="pp_color">T&amp;Cs.</span></Link> You can also have a look at our <Link
								to="/privacy"><span
								className="pp_color">Privacy Policy.</span></Link></p>
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