import React from 'react';
import { FaUniversity, FaChevronRight } from "react-icons/all";

import './settings-payment.styles.scss';

class SettingsPayment extends React.Component {

	state = {
		addAccount: false
	}

	displayAddCard = () => {
		this.setState({ addAccount: !this.state.addAccount });
	}

	render() {

		return (
			<div className="settings_payment_inner">
				<div className="settings_payment_introduction_row regular_sofia">
					Add a bank account to receive your earnings.
				</div>
				<div className="settings_payment_simple_row medium_sofia">
					YOUR ACCOUNTS
				</div>
				<div className="new_payment sb_sofia">
					<div className='settings_payment_row' onClick={this.displayAddCard}>
						Add account
						<FaChevronRight className='settings_menu_r_chevron'/>
					</div>
					{
						!this.state.addAccount ? null :
							<div>
								<div className="settings_payment_holder_row medium_sofia">
									<FaUniversity className='bank_icon bank_icon_padding'/>
									<br/>
									{/*<div className="payment_remove_button medium_sofia">Remove</div>*/ }
									ACCOUNT HOLDER <br/>
									<span className="settings_payment_text regular_sofia">
                                		<input type="text" className="new_payment_input medium_sofia"

											   placeholder="ACCOUNT HOLDER" name="email"/>
                            		</span>
								</div>
								<div className="settings_payment_complex_row medium_sofia">
									<div className="settings_payment_left">
										SORT CODE <br/>
										<span className="settings_payment_text regular_sofia">
                                    		<input type="text" className="new_payment_input medium_sofia"

												   placeholder="SORT CODE" name="email"/>
                                		</span>
									</div>
									<div className="settings_payment_left">
										ACCOUNT NUMBER <br/>
										<span className="settings_payment_text regular_sofia">
                                   			<input type="text" className="new_payment_input medium_sofia"

												   placeholder="ACCOUNT NUMBER" name="email"/>
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
									<div className="settings_payment_add_btn bold_sofia">Add</div>
								</div>
							</div>
					}
				</div>
				<div className="new_payment settings_payment_row sb_sofia">
					Invoices
					<FaChevronRight className='settings_menu_r_chevron'/>
				</div>
			</div>

		);
	}
}

export default SettingsPayment;