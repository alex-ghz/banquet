import React from 'react';
import { connect } from 'react-redux';
import { FaUniversity, FaCheck } from "react-icons/all";
import axios from "axios";

import './startupPopup.styles.scss';

import { selectChefSettings, selectChef, selectChefId } from "../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import { setChefSettings, setChef, disableNewPopup } from "../../redux/user/user.actions";

class StartupPopup extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			panel: 1,
			name: '',
			dob: {
				month: '',
				day: '',
				year: ''
			},
			phoneNo: '',
			payment: {
				accountHolder: '',
				sortCode: '',
				accountNumber: ''
			},
			foodAuthority: false
		}

		this.handleNext = this.handleNext.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleDobChange = this.handleDobChange.bind(this);
		this.handlePaymentChange = this.handlePaymentChange.bind(this);
		this.handleFoodAuthority = this.handleFoodAuthority.bind(this);
	}

	componentDidMount() {
		const { chef } = this.props;

		this.setState({
			name: !!chef.name ? chef.name : '',
			phoneNo: !!chef.phoneNo ? chef.phoneNo : '',
		});
	}

	handleSave() {
		const { chefId, chef, setChef, setChefSettings, chefSettings, disableNewPopup } = this.props;

		axios.post('/profile/updatePopup', {
				 chefId: chefId,
				 settingsId: chef.settings.objectId,
				 name: this.state.name,
				 dob: this.state.dob.month + '-' + this.state.dob.day + '-' + this.state.dob.year,
				 phoneNo: this.state.phoneNo,
				 payment: JSON.stringify(this.state.payment)
			 })
			 .then(response => response.data)
			 .then(data => data.msg)
			 .then(msg => {
				 if ( msg === 'ok' ) {
					 setChef({
						 ...chef,
						 name: this.state.name,
						 phoneNo: this.state.phoneNo
					 });

					 setChefSettings({
						 ...chefSettings,
						 dob: this.state.dob.month + '-' + this.state.dob.day + '-' + this.state.dob.year,
						 payment: JSON.stringify(this.state.payment)
					 });

					 disableNewPopup();
				 }
			 });
		this.handleNext();
	}

	handleNext() {
		switch ( this.state.panel ) {
			case 1:
			case 2:
				this.setState({
					panel: this.state.panel + 1
				});
				break;
			case 3:
				if ( this.state.foodAuthority ) {
					this.setState({
						panel: this.state.panel + 1
					});
				} else {
					this.setState({
						panel: this.state.panel + 2
					});
				}
				break;
			case 4:
			case 5:
				this.props.hidePopup();
				break;
		}

	}

	handleOnChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	handleDobChange(event) {
		const { value, name } = event.target;
		this.setState({
			dob: {
				[name]: value
			}
		})
	}

	handlePaymentChange(event) {
		const { value, name } = event.target;
		this.setState({
			payment: {
				[name]: value
			}
		});
	}

	handleFoodAuthority() {
		this.setState({
			foodAuthority: !this.state.foodAuthority
		});
	}

	render() {

		return (
			<div className="basic_popup">
				<div className="popup_inner">
					{
						this.state.panel === 1 ?
							<div className="first_popup">
								<div className="popup_title bold_sofia">
									Welcome to Banquet! Let's get you started.
								</div>
								<div className="popup_subtitle medium_sofia">
									Add the basics to create your account!
								</div>
								<p className="input_name input_username medium_sofia">Name</p>
								<input type="text" defaultValue={ this.state.name } onChange={ this.handleOnChange } className="username medium_sofia" placeholder="Username" name="name"/>
								<p className="input_name input_dob medium_sofia">DOB</p>
								<div className="birth_inputs">
									<input type="text" className="month medium_sofia" placeholder="Month" name="month" defaultValue={ this.state.dob.month } onChange={ this.handleDobChange }/>
									<input type="number" className="day medium_sofia" placeholder="Day" name="day" defaultValue={ this.state.dob.day } onChange={ this.handleDobChange }/>
									<input type="number" className="year medium_sofia" placeholder="Year" name="year" defaultValue={ this.state.dob.year } onChange={ this.handleDobChange }/>
								</div>
								<p className="input_name input_number medium_sofia">Mobile Number</p>
								<input type="number" className="mobile_number medium_sofia" placeholder="+44" name="phoneNo" defaultValue={ this.state.phoneNo } onChange={ this.handleOnChange }/>
								<div className="next_btn_popup  next_btn_popup_first sb_sofia next-btn" onClick={ this.handleNext }>
									Next
								</div>
								<div className="progress_bar">
									<div className="progress_bar_inner"/>
								</div>
							</div>
							: null
					}

					{
						this.state.panel === 2 ?
							<div className="second_popup">
								<div className="popup_title bold_sofia">
									Add a bank account
								</div>
								<div className="popup_subtitle popup_subtitle_second medium_sofia">
									Add a bank account to receive tour earnings or skip and add later in settings.
								</div>
								<div className="skip_btn medium_sofia" onClick={ this.handleNext }>
									Skip
								</div>
								<FaUniversity className="bank_icon"/>
								<p className="input_name input_username medium_sofia">Account Holder</p>
								<input type="text" className="accountHolder medium_sofia" onChange={ this.handlePaymentChange } defaultValue={ this.state.payment.accountHolder } placeholder="Name"
									   name="accountHolder"/>
								<div className="birth_inputs">
									<div className="sort_code_inner">
										<p className="input_name input_sort_code medium_sofia">Sort Code</p>
										<input type="number" className="sortCode medium_sofia" placeholder="00-00-00" onChange={ this.handlePaymentChange } defaultValue={ this.state.payment.sortCode }
											   name="sortCode"/>
									</div>
									<div className="account_nr_inner">
										<p className="input_name input_account_nr medium_sofia">Account Number</p>
										<input type="number" className="accountNumber medium_sofia" placeholder="000000000" onChange={ this.handlePaymentChange }
											   defaultValue={ this.state.payment.accountNumber } name="accountNumber"/>
									</div>
								</div>
								<div className="next_btn_popup next_btn_popup_second sb_sofia next-btn" onClick={ this.handleNext }>
									Next
								</div>
								<div className="progress_bar">
									<div className="progress_bar_inner progress_bar_inner_second"/>
								</div>
							</div>
							: null
					}

					{
						this.state.panel === 3 ?
							<div className="third_popup">
								<div className="popup_title bold_sofia">
									Banquet Chef Verification
								</div>
								<div className="popup_third_text_first medium_sofia">
									To become a verified Banquet Chef you should be registered with your local food authority.
								</div>
								<div className="popup_third_text medium_sofia">
									If you aren’t, we’ll take the leg work out of the process for you. That leaves you to do what you do best and begin sharing your cooking!
								</div>
								<div className="popup_third_text_last medium_sofia">
									Please indicate below if you are registered or in need of registration.
								</div>
								<div className="popup_third_option" onClick={ this.handleFoodAuthority }>
									<div className="popup_third_option_inner option_registered medium_sofia">
										Yes, I’m registered with my local food authority
										<div className={ `option_uncheck1 ${ this.state.foodAuthority ? 'option_check' : '' }` }>
											<FaCheck className="check_icn1"/>
										</div>
									</div>
								</div>
								<div className="popup_third_option" onClick={ this.handleFoodAuthority }>
									<div className="popup_third_option_inner option_notregistered medium_sofia">
										I’m not registered and would like assistance to get set up
										<div className={ `option_uncheck2 ${ !this.state.foodAuthority ? 'option_check' : '' }` }>
											<FaCheck className="check_icn2"/>
										</div>
									</div>
								</div>
								{
									!this.state.foodAuthority ?
										<div className="notregistered_msg notregistered_msg_color medium_sofia">
											No problem, send us an email at hello@banqueteats.com and we'll help you get cooking!
										</div>
										: null
								}
								<div className="next_btn_popup next_btn_popup_third sb_sofia next-btn" onClick={ this.handleSave }>
									Confirm & continue
								</div>
								<div className="progress_bar">
									<div className="progress_bar_inner progress_bar_inner_third"/>
								</div>
							</div>
							: null
					}

					{
						this.state.panel === 4 ?
							<div className="fourth_popup popup_registered">
								<div className="popup_title bold_sofia">
									Hooray!
								</div>
								<div className="popup_third_text_first medium_sofia">
									Your account setup is complete.
								</div>
								<div className="popup_third_text medium_sofia">
									Explore the app, create your chef profile and add to your menu whilst we begin your registration with your local food authority.
								</div>
								<div className="popup_third_text_last medium_sofia">
									We can’t wait to see what you make!
								</div>
								<div className="popup_success">
									<FaCheck className="checkMark"/>
								</div>
								<div className="next_btn_popup next_btn_popup_fourth sb_sofia next-btn" onClick={ this.handleNext }>
									Start exploring
								</div>
								<div className="progress_bar">
									<div className="progress_bar_inner progress_bar_inner_fourth"/>
								</div>
							</div>
							: null
					}

					{
						this.state.panel === 5 ?
							<div className="fourth_popup popup_notregistered">
								<div className="popup_title bold_sofia">
									Hooray!
								</div>
								<div className="popup_third_text_first medium_sofia">
									Your account setup is complete.
								</div>
								<div className="popup_third_text medium_sofia">
									Explore the app, create your chef profile and add to your menu whilst we begin your registration with your local food authority.
								</div>
								<div className="popup_third_text medium_sofia">
									Head over to the Getting Started page on Chef’s Corner and we’ll get you on your way to sharing your incredible food with your community.
								</div>
								<div className="popup_third_text_last medium_sofia">
									We can’t wait to see what you make!
								</div>
								<div className="popup_success">
									<FaCheck className="checkMark"/>
								</div>
								<div className="next_btn_popup next_btn_popup_fourth sb_sofia next-btn" onClick={ this.handleNext }>
									Start exploring
								</div>
								<div className="progress_bar">
									<div className="progress_bar_inner progress_bar_inner_fourth"/>
								</div>
							</div>
							: null
					}
				</div>
			</div>

		);
	}
}

const mapStateToProps = createStructuredSelector({
	chefSettings: selectChefSettings,
	chefId: selectChefId,
	chef: selectChef
});

const mapDispatchProps = dispatch => ({
	setChefSettings: settings => dispatch(setChefSettings(settings)),
	setChef: chef => dispatch(setChef(chef)),
	disableNewPopup: () => dispatch(disableNewPopup())
});

export default connect(mapStateToProps, mapDispatchProps)(StartupPopup);