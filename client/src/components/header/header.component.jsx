import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.scss';

const Header = () => (
	<div className="site_menu_section">
		<div className="site_menu_logo bold_sofia">
			<Link to='/'>Banquet</Link>
		</div>
		<div className="site_menu_items_container">
			<ul className="site_menu_list">
				<li className="site_menu_item medium_sofia">
					<Link to='/our-story'>Our Story</Link>
				</li>
				<li className="site_menu_item medium_sofia">
					<Link to='/how-it-works'>How it works</Link>
				</li>
				<li className="site_menu_item medium_sofia">
					<Link to='/register'>Become a Banquet Chef</Link>
				</li>
				<li className="site_menu_item site_menu_item_login medium_sofia">
					<Link to='/login'>Chef Log In</Link>
				</li>
			</ul>
		</div>
	</div>
);

export default Header;