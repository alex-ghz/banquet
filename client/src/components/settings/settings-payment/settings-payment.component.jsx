import React from 'react';
import { FaUniversity, FaChevronRight, FaChevronDown } from "react-icons/all";
import axios from "axios";
import { connect } from 'react-redux';

import './settings-payment.styles.scss';
import { createStructuredSelector } from "reselect";
import { setChefSettings } from "../../../redux/user/user.actions";
import { selectChefSettings, selectChef } from "../../../redux/user/user.selectors";

class SettingsPayment extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			addAccount: false,
			accountHolder: null,
			sortCode: null,
			accountNumber: null,
			accountSaved: false,
		}

		this.displayAddCard = this.displayAddCard.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	componentDidMount() {
		const { chefSettings } = this.props;

		if ( !!chefSettings.payment === false ) {
			return;
		}

		this.setState({
			...JSON.parse(chefSettings.payment),
			accountSaved: true
		});
	}

	displayAddCard() {
		this.setState({ addAccount: !this.state.addAccount });
	}

	handleChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	}

	handleSave() {
		let data = {
			accountHolder: this.state.accountHolder,
			sortCode: this.state.sortCode,
			accountNumber: this.state.accountNumber
		};

		const { setChefSettings, chefSettings, chef } = this.props;

		axios.post('/settings/addPayment', {
				 settingsId: chef.settings.objectId,
				 data: JSON.stringify(data)
			 })
			 .then(response => {
			 	this.setState({
					accountSaved: true
				});
				 setChefSettings({
					 ...chefSettings,
					 payment: JSON.stringify(data)
				 });
			 });
	}

	render() {

		return (
			<div className="settings_payment_inner">
				<div className="settings_payment_introduction_row regular_sofia">
					Add a bank account to receive your earnings.
				</div>
				{
					this.state.accountSaved ?
						<div className="settings_payment_simple_row medium_sofia">
							YOUR ACCOUNTS
							<div>
								<div className="settings_payment_holder_row medium_sofia">
									<FaUniversity className='bank_icon bank_icon_padding'/>
									<br/>
									ACCOUNT HOLDER <br/>
									<span className="settings_payment_text regular_sofia">
                                		{ this.state.accountHolder }
                            		</span>
								</div>
								<div className="settings_payment_complex_row medium_sofia">
									<div className="settings_payment_left">
										SORT CODE <br/>
										<span className="settings_payment_text regular_sofia">
                                    		{ this.state.sortCode }
                                		</span>
									</div>
									<div className="settings_payment_left">
										ACCOUNT NUMBER <br/>
										<span className="settings_payment_text regular_sofia">
                                   			{ this.state.accountNumber }
                                		</span>
									</div>
									<div className="settings_payment_right"/>
								</div>
								<div className="settings_payment_complex_row_no_border medium_sofia">
									<div className="settings_payment_left">
										BANK NAME <br/>
										<span className="settings_payment_text regular_sofia">
                                    		BANK NAME
                                		</span>
									</div>
									<div className="settings_payment_left">
										STATUS <br/>
										<span className="settings_payment_text regular_sofia">
                                    		Pending
                                		</span>
									</div>
									<div className="settings_payment_right"/>
								</div>
							</div>
						</div>
						:
						<div className="new_payment sb_sofia">
							<div className='settings_payment_row settings_row_pointer' onClick={ this.displayAddCard }>
								Add account
								{
									!this.state.addAccount ?
										<FaChevronRight className='settings_menu_r_chevron'/>
										:
										<FaChevronDown className='settings_menu_r_chevron'/>
								}
							</div>
							{
								!this.state.addAccount ? null :
									<div>
										<div className="settings_payment_holder_row medium_sofia">
											<FaUniversity className='bank_icon bank_icon_padding'/>
											<br/>
											ACCOUNT HOLDER <br/>
											<span className="settings_payment_text regular_sofia">
                                		<input type="text" className="new_payment_input medium_sofia"
											   placeholder="ACCOUNT HOLDER" name="accountHolder" defaultValue={ this.state.accountHolder } onChange={ this.handleChange }/>
                            		</span>
										</div>
										<div className="settings_payment_complex_row medium_sofia">
											<div className="settings_payment_left">
												SORT CODE <br/>
												<span className="settings_payment_text regular_sofia">
                                    		<input type="text" className="new_payment_input medium_sofia"
												   placeholder="SORT CODE" name="sortCode" defaultValue={ this.state.sortCode } onChange={ this.handleChange }/>
                                		</span>
											</div>
											<div className="settings_payment_left">
												ACCOUNT NUMBER <br/>
												<span className="settings_payment_text regular_sofia">
                                   			<input type="text" className="new_payment_input medium_sofia"
												   placeholder="ACCOUNT NUMBER" name="accountNumber" defaultValue={ this.state.accountNumber } onChange={ this.handleChange }/>
                                		</span>
											</div>
											<div className="settings_payment_right"/>
										</div>
										<div className="settings_payment_complex_row_no_border medium_sofia">
											<div className="settings_payment_left">
												BANK NAME <br/>
												<span className="settings_payment_text regular_sofia">
                                    		BANK NAME
                                		</span>
											</div>
											<div className="settings_payment_left">
												STATUS <br/>
												<span className="settings_payment_text regular_sofia">
                                    		Pending
                                		</span>
											</div>
											<div className="settings_payment_right"/>
										</div>
										<div>
											<div className="settings_payment_add_btn bold_sofia" onClick={ this.handleSave }>Add</div>
										</div>
									</div>
							}
						</div>
				}
				<div className="new_payment settings_payment_row sb_sofia">
					Invoices
					<FaChevronRight className='settings_menu_r_chevron'/>
				</div>
			</div>

		);
	}
}

const mapStateToProps = createStructuredSelector({
	chefSettings: selectChefSettings,
	chef: selectChef
});

const mapDispatchProps = dispatch => ({
	setChefSettings: settings => dispatch(setChefSettings(settings))
});

export default connect(mapStateToProps, mapDispatchProps)(SettingsPayment);