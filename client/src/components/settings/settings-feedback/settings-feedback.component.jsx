import React from 'react';

import './settings-feedback.styles.scss';

const SettingsFeedback = () => (
	<div className="settings_feedback_inner">
		<p className="settings_feedback_text regular_sofia">We love to hear your feedback and how you think we could
			improve Banquet. Feel free to share your thoughts below!</p>
		<input placeholder="Once upon a time…" type="text" defaultValue="" className="settings_feedback regular_sofia"/>
		<div className="send_feedback_btn bold_sofia">Send</div>
	</div>
);

export default SettingsFeedback;