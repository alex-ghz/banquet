import React from 'react';
import { connect } from 'react-redux';

import './sidemenu-middle.styles.scss';

import SideMenuButton from "../sidemenu-button/sidemenu-button.component";

import { selectCurrentPage } from "../../../redux/page/page.selectors";
import { createStructuredSelector } from "reselect";

const SideMenuMiddle = ({ currentPage }) => {
	const items = [
		'home', 'orders', 'menu', 'profile'
	];

	return (
		<div className='menu_list_container'>
			<div className='menu_list'>
				{
					items.map(item => <SideMenuButton key={item} title={item} selected={currentPage === item}/>)
				}
			</div>
		</div>
	)
};

const mapStateToProps = createStructuredSelector({
	currentPage: selectCurrentPage
});

export default connect(mapStateToProps)(SideMenuMiddle);