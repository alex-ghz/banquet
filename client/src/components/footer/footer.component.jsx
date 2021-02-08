import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/all";
import { Link } from 'react-router-dom';

import './footer.styles.scss';

const Footer = () => (
	<div className="site_footer_section">
		<div className="site_footer_section_inner">
			<div className="footer_list">
				<div className="footer_list_inner">
					<div className="footer_title_list sb_sofia">Banquet</div>
					<Link className="footer_option_list regular_sofia" to='/our-story'>Our Story</Link>
					{/*<div className="footer_option_list regular_sofia">Press Kit</div>*/ }
					{/*<div className="footer_option_list regular_sofia">Careers</div>*/ }
				</div>
				<div className="footer_list_inner">
					<div className="footer_title_list sb_sofia">Community</div>
					<div className="footer_option_list regular_sofia">Banquet Chef</div>
					<Link className="footer_option_list regular_sofia" to='/how-it-works'>How it works</Link>
					<div className="footer_option_list regular_sofia">Contact</div>
				</div>
				{/*<div className="footer_list_inner">*/ }
				{/*	<div className="footer_title_list sb_sofia">Help</div>*/ }
				{/*	<div className="footer_option_list regular_sofia">Live Chat</div>*/ }
				{/*	<div className="footer_option_list regular_sofia">FAQ</div>*/ }
				{/*</div>*/ }
			</div>
			<div className="footer_bottom">
				<div className="footer_copyright_items medium_sofia">
					<div className="footer_bottom_item">&#169; 2020 Banquet Technologies. All rights reserved. <span
						className="copy_symbol">&#9679;</span></div>
					<div className="footer_bottom_item">Privacy <span className="copy_symbol">&#9679;</span></div>
					<div className="footer_bottom_item">Terms <span className="copy_symbol">&#9679;</span></div>
				</div>
				<div className="footer_social_media">
					<FaFacebook className='logo_footer'/>
					<FaInstagram className='logo_footer'/>
					<FaTwitter className='logo_footer'/>
				</div>
			</div>
		</div>
	</div>
);

export default Footer;