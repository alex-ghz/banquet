import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './getting-started.styles.scss';

import { setCurrentPage } from "../../redux/page/page.actions";

class GettingStarted extends React.Component {

	constructor(props) {
		super(props);

		this.handlePage = this.handlePage.bind(this);
	}

	handlePage() {
		const { setCurrentPage } = this.props;
		setCurrentPage('profile');
	}

	render() {

		return (
			<Link to='/profile' onClick={this.handlePage}>
				<div className="started_container pulse">
					<div className="started_title bold_sofia">Getting Started</div>
					<div className="started_text regular_sofia">Let’s get you registered with your local food
						authority.
					</div>
				</div>
			</Link>
		);
	}
}

const mapDispatchProps = dispatch => ({
	setCurrentPage: page => dispatch(setCurrentPage(page))
});

export default connect(null, mapDispatchProps)(GettingStarted);