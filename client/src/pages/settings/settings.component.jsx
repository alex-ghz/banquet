import React from 'react';
import { Route } from 'react-router-dom';

import './settings.styles.scss';

import SettingsLink from "../../components/settings/settings-link/settings-link.component";

import SettingsAccount from "../../components/settings/settings-account/settings-account.component";

class Settings extends React.Component {

	render() {
		let match = this.props.match;

		let sections = [
			{
				id: 'settingsAccount',
				title: 'My Account',
				type: 'account'
			},
			{
				id: 'settingsVerification',
				title: 'Verification',
				type: 'verification'
			},
			{
				id: 'settingsNotifications',
				title: 'Notifications',
				type: 'notifications'
			},
			{
				id: 'settingsPayment',
				title: 'Payment',
				type: 'payment'
			},
			{
				id: 'settingsPrivacy',
				title: 'Privacy',
				type: 'privacy'
			},
			{
				id: 'settingsHelp',
				title: 'Help',
				type: 'help'
			},
			{
				id: 'settingsFeedback',
				title: 'Feedback',
				type: 'feedback'
			}
		];

		return (
			<div className='settings_dash'>
				<div className='settings_dash_menu'>
					<div className="settings_dash_menu_title sb_sofia">Settings</div>
					<div className='settings_dash_menu_container'>
						{
							sections.map(section => (<SettingsLink key={section.id} {...section}/>))
						}
					</div>
				</div>
				<div className="settings_dash_content_section">
					<Route path={ `${ match.path }/account` } component={ SettingsAccount }/>
				</div>
			</div>
		);
	}
}

export default Settings;