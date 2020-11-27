import React from 'react';

import './sidemenu.styles.scss';

import SideMenuTop from "../sidemenu-top/sidemenu-top.component";
import SideMenuMiddle from "../sidemenu-middle/sidemenu-middle.component";
import SideMenuBottom from "../sidemenu-bottom/sidemenu-bottom.component";

const SideMenu = () => (
	<div className='side-menu'>
		<SideMenuTop/>
		<SideMenuMiddle/>
		<SideMenuBottom/>
	</div>
);

export default SideMenu;