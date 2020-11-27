import React from 'react';
import { FaHome, FaListAlt, FaList, FaUser } from "react-icons/all";

import './sidemenu-button.styles.scss';

class SideMenuButton extends React.Component {

	getIcon(type) {
		switch ( type ) {
			case 'home':
				return (<FaHome className='icon_menu'/>);
			case 'orders':
				return (<FaListAlt className='icon_menu'/>);
			case 'menu':
				return (<FaList className='icon_menu'/>);
			case 'profile':
				return (<FaUser className='icon_menu'/>);
			default:
				return (<FaHome className='icon_menu'/>);
		}
	}

	render() {
		return (
			<div className='menu-button'>
				<div className='empty_div'/>
				<div className='menu_item bold_sofia'>
					{this.getIcon(this.props.title)}
					<span className='button_title'>{ this.props.title }</span>
				</div>
				<div className='empty_div'/>
			</div>
		);
	}
}

export default SideMenuButton;