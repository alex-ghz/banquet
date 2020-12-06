import React from 'react';

import './settings-account.styles.scss';

const SettingsAccount = () => (
	<div className="settings_account_inner">
		<div className="settings_account_item">
			<div className="settings_account_static medium_sofia">NAME</div>
			<div className="settings_account_dynamic settings_name_dynamic regular_sofia">George</div>
		</div>
		<div className="settings_account_item">
			<div className="settings_account_static medium_sofia">DOB</div>
			<div className="settings_account_dynamic settings_birth_dynamic regular_sofia">06/07/1995</div>
		</div>
		<div className="settings_account_item settings_item_flex">
			<div className="settings_account_static medium_sofia">EMAIL</div>
			<div className="settings_account_edit_btn medium_sofia">Edit</div>
		</div>
		<div className="settings_account_item settings_item_flex">
			<div className="settings_account_static medium_sofia">PHONE</div>
			<div className="settings_account_edit_btn medium_sofia">Edit</div>
		</div>
		<div className="settings_account_item settings_item_flex">
			<div className="settings_account_static medium_sofia">PASSWORD</div>
			<div className="settings_account_edit_btn medium_sofia">Edit</div>
		</div>
	</div>
);

export default SettingsAccount;