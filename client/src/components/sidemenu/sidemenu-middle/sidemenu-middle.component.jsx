import React from 'react';

import './sidemenu-middle.styles.scss';

import SideMenuButton from "../sidemenu-button/sidemenu-button.component";

const SideMenuMiddle = () => (
	<div className='menu_list_container'>
		<div className='menu_list'>
			<SideMenuButton title='home'/>
			<SideMenuButton title='orders'/>
			<SideMenuButton title='menu'/>
			<SideMenuButton title='profile'/>
		</div>
	</div>
);

export default SideMenuMiddle;