import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import axios from "axios";

import './settings-notifications.styles.scss';

import { selectChef, selectChefSettings } from "../../../redux/user/user.selectors";
import { setChefSettings } from "../../../redux/user/user.actions";

class SettingsNotifications extends React.Component {

	changeEmailNotif = () => {
		let setChefSettings = this.props.setChefSettings;
		let chefSettings = this.props.chefSettings;
		let newValue = !chefSettings.receiveOrderEmail;
		let settingsId = this.props.chef.settings.objectId;

		setChefSettings({
			...this.props.chefSettings,
			receiveOrderEmail: newValue
		});

		axios.post('chef', {
			settingsId: settingsId,
			settingName: 'receiveOrderEmail',
			value: newValue
		});
	}

	render() {
		const chefSettings = this.props.chefSettings;

		return (
			<div className="settings_notifications_inner">
				{/*<div className="settings_notification_type_title sb_sofia">Push Notifications</div>*/ }
				{/*<div className="settings_notification_toggle regular_sofia">*/ }
				{/*	Notify me when someone favourites my profile*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle regular_sofia">*/ }
				{/*	Notify me when someone favourites my dish*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				<div className="settings_notification_type_title sb_sofia">Reminders</div>
				<p className="settings_notification_type_text regular_sofia">Receive order reminders, delivery reminders
					and
					other reminders related to your activities on Banquet. You cannot disable push notifications for
					reminders
					on Banquet Chef.</p>
				<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
					Email
					<label className="switch switch_notifications">
						<input type="checkbox" defaultChecked={ chefSettings.receiveOrderEmail }
							   onChange={ this.changeEmailNotif }/>
						<span className="slider slider_notifications round"/>
					</label>
				</div>
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Push Notifications*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Text Messages*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_type_title sb_sofia">Insights</div>*/ }
				{/*<p className="settings_notification_type_text regular_sofia">Receive personalised insights from your activity*/ }
				{/*	and customers in the Banquet community.</p>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Email*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Push Notifications*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Text Messages*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_type_title sb_sofia">Recommendations</div>*/ }
				{/*<p className="settings_notification_type_text regular_sofia">Receive suggestions on menus, promotions and more*/ }
				{/*	based on your Banquet activity.</p>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Email*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Push Notifications*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Text Messages*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_type_title sb_sofia">Community</div>*/ }
				{/*<p className="settings_notification_type_text regular_sofia">Get updates from popular chefs and dishes near*/ }
				{/*	where you live.</p>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Email*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Push Notifications*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Text Messages*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_type_title sb_sofia">Features</div>*/ }
				{/*<p className="settings_notification_type_text regular_sofia">Stay up to date with new products and features.</p>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Email*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Push Notifications*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Text Messages*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_type_title sb_sofia">Account Support</div>*/ }
				{/*<p className="settings_notification_type_text regular_sofia">We may need to send you messages regarding your*/ }
				{/*	account, your orders, began notifications, and customer support requests.</p>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Email*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Push Notifications*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
				{/*<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">*/ }
				{/*	Text Messages*/ }
				{/*	<label className="switch switch_notifications">*/ }
				{/*		<input type="checkbox"/>*/ }
				{/*		<span className="slider slider_notifications round"/>*/ }
				{/*	</label>*/ }
				{/*</div>*/ }
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	setChefSettings: settings => dispatch(setChefSettings(settings))
});

const mapStateToProps = createStructuredSelector({
	chefSettings: selectChefSettings,
	chef: selectChef
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsNotifications);