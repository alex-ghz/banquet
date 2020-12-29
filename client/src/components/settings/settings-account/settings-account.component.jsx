import React from 'react';
import { connect } from 'react-redux';

import './settings-account.styles.scss';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../../redux/user/user.selectors";
import { selectChefSettings, selectChef } from "../../../redux/user/user.selectors";

class SettingsAccount extends React.Component {

	state = {
		name: false,
		dob: false,
		email: false,
		phone: false,
		password: false
	};

	formatDate = date => {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if ( month.length < 2 )
			month = '0' + month;
		if ( day.length < 2 )
			day = '0' + day;

		return [year, month, day].join('-');
	}

	render() {
		const currentUser = this.props.currentUser;
		const chefSettings = this.props.chefSettings;
		const chef = this.props.chef;

		return (
			<div className="settings_account_inner">
				<div className="settings_account_item">
					<div className='settings_item_flex'>
						<div className="settings_account_static medium_sofia">NAME</div>
						{/*<div className="settings_account_edit_btn medium_sofia">Edit</div>*/ }
					</div>
					<div
						className="settings_account_dynamic settings_name_dynamic regular_sofia">{ currentUser.chef.name }</div>
				</div>
				{/*<div className="settings_account_item">*/ }
				{/*	<div className='settings_item_flex'>*/ }
				{/*		<div className="settings_account_static medium_sofia">DOB</div>*/ }
				{/*		<div className="settings_account_edit_btn medium_sofia">Edit</div>*/ }
				{/*	</div>*/ }
				{/*	<div className="settings_account_dynamic settings_name_dynamic regular_sofia">*/ }
				{/*		{*/ }
				{/*			chefSettings.dob ?*/ }
				{/*				chefSettings.dob*/ }
				{/*				:*/ }
				{/*				''*/ }
				{/*		}*/ }
				{/*	</div>*/ }
				{/*</div>*/ }
				<div className="settings_account_item">
					<div className="settings_account_static medium_sofia">EMAIL</div>
					<div
						className="settings_account_dynamic settings_birth_dynamic regular_sofia">{ currentUser.user.email }</div>
				</div>
				<div className="settings_account_item">
					<div className='settings_item_flex'>
						<div className="settings_account_static medium_sofia">PHONE</div>
						{/*<div className="settings_account_edit_btn medium_sofia">Edit</div>*/ }
					</div>
					<div
						className="settings_account_dynamic settings_name_dynamic regular_sofia">{ chef.phoneNo }</div>
				</div>
				{/*<div className="settings_account_item settings_item_flex">*/}
				{/*	<div className="settings_account_static medium_sofia">PASSWORD</div>*/}
				{/*	<div className="settings_account_edit_btn medium_sofia">Edit</div>*/}
				{/*</div>*/}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	chefSettings: selectChefSettings,
	chef: selectChef
});

export default connect(mapStateToProps)(SettingsAccount);