import React from 'react';

import './homepage.styles.scss';

import ChefDashboard from "../../../components/chef-dashboard/chef-dashboard/chef-dashboard.component";

class HomePage extends React.Component {

	render() {
		return (
			<div>
				<div className="home_chef">
					<ChefDashboard/>
				</div>
			</div>
		);
	}
}

export default HomePage;