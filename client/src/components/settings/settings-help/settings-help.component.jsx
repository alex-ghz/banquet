import React from 'react';
import {FaChevronRight} from "react-icons/all";

import './settings-help.styles.scss';

const SettingsHelp = () => (
	<div className="settings_help_inner">
		<div className="settings_help_row regular_sofia">
			Live Chat
			<FaChevronRight className='settings_menu_r_chevron'/>
		</div>
		{/*<div className="settings_help_row regular_sofia">*/}
		{/*	FAQ*/}
		{/*	<FaChevronRight className='settings_menu_r_chevron'/>*/}
		{/*</div>*/}
		<div className="settings_help_row regular_sofia">
			Customer Support
			<FaChevronRight className='settings_menu_r_chevron'/>
		</div>
	</div>

);

export default SettingsHelp;