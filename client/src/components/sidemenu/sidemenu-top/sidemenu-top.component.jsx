import React from 'react';
import { FaCog, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IconContext } from "react-icons";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './sidemenu-top.styles.scss';

import { selectCurrentPage } from "../../../redux/page/page.selectors";
import { setCurrentPage } from "../../../redux/page/page.actions";
import { createStructuredSelector } from "reselect";

const SideMenuTop = ({ setCurrentPage, currentPage }) => {
	let sideMenuArrow = 1 ? <FaChevronLeft/> : <FaChevronRight/>;

	return (
		<div className='side-menu-top'>
			<div className={ `settings_btn ${ currentPage === 'settings' ? 'active_top' : '' }` }>
				<Link to='/settings' onClick={ () => setCurrentPage('settings') } className='settings_flex'>
					<IconContext.Provider
						value={ currentPage === 'settings' ? { className: 'settings_icon active_top' } : { className: 'settings_icon' } }>
						<div>
							<FaCog/>
						</div>
					</IconContext.Provider>
					<span className={`label_settings bold_sofia ${ currentPage === 'settings' ? 'active_top' : '' }`}>
						Settings
					</span>
				</Link>
			</div>
			<div className="menu_arrows">
				{/*{ sideMenuArrow }*/ }
			</div>
		</div>
	);
}

const mapDispatchProps = dispatch => ({
	setCurrentPage: user => dispatch(setCurrentPage(user))
});

const mapStateToProps = createStructuredSelector({
	currentPage: selectCurrentPage
});

export default connect(mapStateToProps, mapDispatchProps)(SideMenuTop);