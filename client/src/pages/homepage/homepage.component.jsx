import React from 'react';

import './homepage.styles.scss';

import SideMenu from "../../components/sidemenu/sidemenu.component";

class HomePage extends React.Component {

	render() {

		return (
			<div>
				<SideMenu/>
				<h1>HomePage</h1>
			</div>
		);
	}
}

export default HomePage;