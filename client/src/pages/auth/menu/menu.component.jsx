import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './menu.styles.scss';

import MenuSection from "../../../components/menu/menu-section/menu-section.component";
import WithSpinner from "../../../components/with-spinner/with-spinner.component";
import { fetchCollectionStartAsync, fetchCollectionsStart } from "../../../redux/menu/menu.actions";
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../../redux/menu/menu.selectors";
import { selectCurrentUserMenuId } from "../../../redux/user/user.selectors";

const MenuSectionWithSpinner = WithSpinner(MenuSection);

class Menu extends React.Component {

	componentDidMount() {
		let { fetchCollectionsStartAsync, isCollectionFetching, fetchCollectionsStart, menuId } = this.props;

		if ( !isCollectionFetching ) {
			fetchCollectionsStart();
			fetchCollectionsStartAsync(menuId);
		}
	}

	render() {
		let { isCollectionsLoaded, isCollectionFetching } = this.props;
		let isLoading = isCollectionsLoaded === true && isCollectionFetching === false;

		return (
			<div>
				<MenuSectionWithSpinner isLoading={ !isLoading }/>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	isCollectionFetching: selectIsCollectionFetching,
	isCollectionsLoaded: selectIsCollectionsLoaded,
	menuId: selectCurrentUserMenuId
});

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
	fetchCollectionsStartAsync: menuId => dispatch(fetchCollectionStartAsync(menuId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);