import React from 'react';
import { FaHome, FaListAlt, FaList, FaUser } from "react-icons/all";
import { Link } from 'react-router-dom';

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
				<Link to={`/${this.props.title}`}>
					<div className='menu_item bold_sofia selected'>
						{this.getIcon(this.props.title)}
						<span className='button_title'>{ this.props.title }</span>
					</div>
				</Link>
				<div className='empty_div'/>
			</div>
		);
	}
}

export default SideMenuButton;