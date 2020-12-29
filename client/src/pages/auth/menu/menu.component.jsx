import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './menu.styles.scss';

import MenuSection from "../../../components/menu/menu-section/menu-section.component";
import WithSpinner from "../../../components/with-spinner/with-spinner.component";
import { fetchCollectionStartAsync } from "../../../redux/menu/menu.actions";
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../../redux/menu/menu.selectors";
import { selectCurrentUserMenuId } from "../../../redux/user/user.selectors";

const MenuSectionWithSpinner = WithSpinner(MenuSection);

class Menu extends React.Component {

	componentDidMount() {
		let { fetchCollectionsStartAsync, menuId } = this.props;
		fetchCollectionsStartAsync(menuId);
	}

	render() {

		return (
			<div>
				<MenuSectionWithSpinner isLoading={ true }/>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
	isCollectionsLoaded: selectIsCollectionsLoaded,
	menuId: selectCurrentUserMenuId
})

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStartAsync: menuId => dispatch(fetchCollectionStartAsync(menuId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);