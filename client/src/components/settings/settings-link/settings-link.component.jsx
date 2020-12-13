import React from 'react';
import {
	FaUserCircle,
	FaChevronRight,
	FaCheckSquare,
	FaBell,
	FaCreditCard,
	FaLock,
	FaQuestionCircle,
	FaSmile
} from "react-icons/all";
import { Link } from 'react-router-dom';

import './settings-link.styles.scss';

class SettingsLink extends React.Component {

	getIcon(type) {
		switch ( type ) {
			case 'account':
				return (<FaUserCircle className='settings_dash_icon'/>);
			case 'verification':
				return (<FaCheckSquare className='settings_dash_icon'/>);
			case 'notifications':
				return (<FaBell className='settings_dash_icon'/>);
			case 'payment':
				return (<FaCreditCard className='settings_dash_icon'/>);
			case 'privacy':
				return (<FaLock className='settings_dash_icon'/>);
			case 'help':
				return (<FaQuestionCircle className='settings_dash_icon'/>);
			case 'feedback':
				return (<FaSmile className='settings_dash_icon'/>);
			default:
				return null;
		}
	}

	getUrl(type) {
		return `/settings/${ type }`;
	}

	render() {
		return (
			<Link to={ this.getUrl(this.props.type) }>
				<div className="settings_dash_menu_item regular_sofia">
					<div className="settings_menu_icon">
						{ this.getIcon(this.props.type) }
					</div>
					<div className="settings_menu_text"><span
						className="settings_dash_menu_name">{ this.props.title }</span>
					</div>
					<div className="settings_menu_icon">
						<FaChevronRight className='settings_menu_r_chevron'/>
					</div>
				</div>
			</Link>
		);
	}
}

export default SettingsLink;