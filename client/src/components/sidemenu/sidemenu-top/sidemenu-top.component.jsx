import React from 'react';
import { FaCog, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {Link} from 'react-router-dom';

import './sidemenu-top.styles.scss';

const SideMenuTop = () => {
	let sideMenuArrow = 1 ? <FaChevronLeft/> : <FaChevronRight/>;

	return (
		<div className='side-menu-top'>
			<div className="settings_btn">
				<Link to='/settings'>
					<FaCog/>
				</Link>
			</div>
			<div className="menu_arrows">
				{ sideMenuArrow }
			</div>
		</div>
	);
}

export default SideMenuTop;