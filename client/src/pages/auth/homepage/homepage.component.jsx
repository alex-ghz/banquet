import React from 'react';
import { connect } from "react-redux";

import './homepage.styles.scss';

import { selectCurrentUser } from "../../../redux/user/user.selectors";

import ChefDashboard from "../../../components/chef-dashboard/chef-dashboard/chef-dashboard.component";
import StartupPopup from "../../../components/startupPopup/startupPopup.component";
import { createStructuredSelector } from "reselect";

class HomePage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			displayPopup: false
		};

		this.togglePopup = this.togglePopup.bind(this);
	}

	componentDidMount() {
		const { currentUser } = this.props;

		if ( !!currentUser.newUser && currentUser.newUser ) {
			this.togglePopup();
		}
	}

	togglePopup() {
		this.setState({
			displayPopup: !this.state.displayPopup
		});
	}

	render() {
		return (
			<div>
				<div className="home_chef">
					<ChefDashboard/>
				</div>
				{
					this.state.displayPopup ?
						<StartupPopup hidePopup={ this.togglePopup }/>
						: null
				}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(HomePage);