import React from 'react';

import './settings-notifications.styles.scss';

const SettingsNotifications = () => (
	<div className="settings_notifications_inner">
		<div className="settings_notification_type_title sb_sofia">Push Notifications</div>
		<div className="settings_notification_toggle regular_sofia">
			Notify me when someone favourites my profile
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle regular_sofia">
			Notify me when someone favourites my dish
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_type_title sb_sofia">Reminders</div>
		<p className="settings_notification_type_text regular_sofia">Receive order reminders, delivery reminders and
			other reminders related to your activities on Banquet. You cannot disable push notifications for reminders
			on Banquet Chef.</p>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Email
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Push Notifications
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Text Messages
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_type_title sb_sofia">Insights</div>
		<p className="settings_notification_type_text regular_sofia">Receive personalised insights from your activity
			and customers in the Banquet community.</p>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Email
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Push Notifications
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Text Messages
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_type_title sb_sofia">Recommendations</div>
		<p className="settings_notification_type_text regular_sofia">Receive suggestions on menus, promotions and more
			based on your Banquet activity.</p>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Email
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Push Notifications
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Text Messages
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_type_title sb_sofia">Community</div>
		<p className="settings_notification_type_text regular_sofia">Get updates from popular chefs and dishes near
			where you live.</p>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Email
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Push Notifications
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Text Messages
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_type_title sb_sofia">Features</div>
		<p className="settings_notification_type_text regular_sofia">Stay up to date with new products and features.</p>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Email
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Push Notifications
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Text Messages
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_type_title sb_sofia">Account Support</div>
		<p className="settings_notification_type_text regular_sofia">We may need to send you messages regarding your
			account, your orders, began notifications, and customer support requests.</p>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Email
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Push Notifications
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
		<div className="settings_notification_toggle toggle_padding_bottom regular_sofia">
			Text Messages
			<label className="switch switch_notifications">
				<input type="checkbox"/>
				<span className="slider slider_notifications round"/>
			</label>
		</div>
	</div>
);

export default SettingsNotifications;