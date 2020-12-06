import React from 'react';
import { FaUniversity, FaChevronRight } from "react-icons/all";

import './settings-payment.styles.scss';

const SettingsPayment = () => (
	<div className="settings_payment_inner">
		<div className="settings_payment_introduction_row regular_sofia">
			Add a bank account to receive your earnings.
		</div>
		<div className="settings_payment_simple_row medium_sofia">
			YOUR ACCOUNTS
		</div>
		<div className="settings_payment_holder_row medium_sofia">
			<FaUniversity className='bank_icon bank_icon_padding'/>
			<br/>
			<div className="payment_remove_button medium_sofia">Remove</div>
			ACCOUNT HOLDER <br/>
			<span className="settings_payment_text regular_sofia">
                                NAME
                            </span>
		</div>
		<div className="settings_payment_complex_row medium_sofia">
			<div className="settings_payment_left">
				SORT CODE <br/>
				<span className="settings_payment_text regular_sofia">
                                    00-00-00
                                </span>
			</div>
			<div className="settings_payment_left">
				ACCOUNT NUMBER <br/>
				<span className="settings_payment_text regular_sofia">
                                    00000000
                                </span>
			</div>
			<div className="settings_payment_right"/>
		</div>
		<div className="settings_payment_complex_row medium_sofia">
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
		<div className="settings_btn_add_inner">
			<div className="settings_payment_add_btn bold_sofia">Add</div>
		</div>
		<div className="settings_payment_row sb_sofia">
			Add another account
			<FaChevronRight className='settings_menu_r_chevron'/>
		</div>
		<div className="settings_payment_row sb_sofia">
			Invoices
			<FaChevronRight className='settings_menu_r_chevron'/>
		</div>
	</div>

);

export default SettingsPayment;