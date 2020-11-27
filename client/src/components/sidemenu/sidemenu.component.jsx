import React from 'react';

import './sidemenu.styles.scss';

import SideMenuTop from "../sidemenu-top/sidemenu-top.component";
import SideMenuMiddle from "../sidemenu-middle/sidemenu-middle.component";

const SideMenu = () => (
	<div className='side-menu'>
		<SideMenuTop/>
		<SideMenuMiddle/>
	</div>
);

export default SideMenu;