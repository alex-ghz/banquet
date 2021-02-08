import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './chef-dashboard-card-small.styles.scss';
import { setCurrentPage } from "../../../redux/page/page.actions";

const ChefDashboardCardSmall = ({ title, value, description, hasNotfication, pulse, redirect, setCurrentPage }) => (
	<div>
		{
			!!redirect ?
				<Link to={ `/${ redirect }` } onClick={ () => {
					setCurrentPage(redirect)
				} }>
					<div className={ `order_active ${ !!pulse && pulse ? 'pulse' : '' }` }>
						<div className="information_title medium_sofia">
							{ title }
							{
								hasNotfication ?
									<div className="title_square">i</div>
									: null
							}
						</div>
						<div className="information_value sb_sofia">{ value }</div>
						<div className="information_final sb_sofia">{ description }</div>
					</div>
				</Link>
				:
				<div className={ `order_active ${ !!pulse && pulse ? 'pulse' : '' }` }>
					<div className="information_title medium_sofia">
						{ title }
						{
							hasNotfication ?
								<div className="title_square">i</div>
								: null
						}
					</div>
					<div className="information_value sb_sofia">{ value }</div>
					<div className="information_final sb_sofia">{ description }</div>
				</div>
		}
	</div>
);

const mapDispatchProps = dispatch => ({
	setCurrentPage: page => dispatch(setCurrentPage(page))
});

export default connect(null, mapDispatchProps)(ChefDashboardCardSmall);