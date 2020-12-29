import React from 'react';
import {Link} from 'react-router-dom';

import './getting-started.styles.scss';

const GettingStarted = () => (
	<Link to='/profile'>
		<div className="started_container pulse">
			<div className="started_title bold_sofia">Getting Started</div>
			<div className="started_text regular_sofia">Let’s get you registered with your local food
				authority.
			</div>
		</div>
	</Link>
);

export default GettingStarted;