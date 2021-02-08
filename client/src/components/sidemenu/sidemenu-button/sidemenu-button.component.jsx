import React from 'react';
import { connect } from 'react-redux';
import { FaHome, FaListAlt, FaList, FaUser } from "react-icons/all";
import { Link } from 'react-router-dom';

import './sidemenu-button.styles.scss';

import { setCurrentPage } from "../../../redux/page/page.actions";
import { createStructuredSelector } from "reselect";
import { selectAllOrders } from "../../../redux/orders/orders.selectors";

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

	newOrdersDot = (type, state) => {
		if ( type === 'orders' && state !== 0 ) {
			return (<div className="title_circle_sidemenu"/>);
		}
	}

	render() {
		const newOrders = !!this.props.orders ? (!!this.props.orders.new ? this.props.orders.new.length : 0) : 0

		return (
			<div className='menu-button'>
				<div className='empty_div'/>
				<Link className={ this.props.title === 'orders' ? 'orders-sidemenu' : '' }
					  to={ `/${ this.props.title }` } onClick={ () => this.props.setCurrentPage(this.props.title) }>
					<div
						className={ `menu_item bold_sofia ${ this.props.selected ? 'selected' : '' }` }>
						{ this.getIcon(this.props.title) }
						<span className='button_title'>{ this.props.title }</span>
					</div>
					{ this.newOrdersDot(this.props.title, newOrders) }
				</Link>
				<div className='empty_div_bottom'/>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	orders: selectAllOrders
});

const mapDispatchProps = dispatch => ({
	setCurrentPage: page => dispatch(setCurrentPage(page))
});

export default connect(mapStateToProps, mapDispatchProps)(SideMenuButton);