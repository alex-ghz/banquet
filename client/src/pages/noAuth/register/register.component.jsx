import React from 'react';
import { Link } from 'react-router-dom';
import './register.styles.scss';

class Register extends React.Component {
    render () {
        
        return (
            <div class="login-page">
				<div class="login-page-inner">
					<div class="left-content">
						<div class="login_page_title bold_sofia">Earn from your kitchen today.</div>
						<div class="login_page_text bold_sofia">Sell your home cooked dishes to your local community and earn an income on your own terms.</div>
					</div>
					<div class="right-content">
						<div class="right-con-inner">
							<div class="login-buttons">
                            <Link to="/register">
								<div class="signup-btn sb_sofia btn_underline">Sign up</div>
							</Link>
							<Link to="/login">
								<div class="login-btn sb_sofia">Log In</div>
							</Link>
							</div>
							<p class="input_name medium_sofia">Name</p>
							<input type="text" class="first_name_login medium_sofia" placeholder="User Name" name="first-name"/>
							<p class="input_name medium_sofia">Email</p>
							<input type="text" class="email_address_login medium_sofia" placeholder="User1@email.com" name="e-mail"/>
                            <p class="input_name medium_sofia">Phone Number</p>
                            <input type="number" class="phone_number medium_sofia" placeholder="+44" name="phone-number"></input>
                            <p class="sch-msg medium_sofia">Once signed up, we’ll schedule a welcome call with you to onboard you onto the dashboard.</p>
							<p class="input_name medium_sofia">Password</p>
							<input type="password" class="password_login medium_sofia" placeholder="Password" name="pwd"/>
							<div class="signin-btn sb_sofia">
								Sign Up
							</div>
							<p class="privacy_policy medium_sofia">By continuing you agree to our <span class="pp_color">T&amp;Cs.</span> You can also have a look at our <span class="pp_color">Privacy Policy.</span></p>
						</div>
					</div>
				</div>
			</div>
        );
    }
}

export default Register;