import React from 'react';
import {Link} from 'react-router-dom';

import './reviews.styles.scss';

const Reviews = () => (
	<Link to='/home/reviews'>
		<div className="reviews_container">
			<div className="reviews_title bold_sofia">Reviews
				<div className="title_circle"/>
			</div>
			<div className="reviews_text medium_sofia">See what your customers think</div>
		</div>
	</Link>
);

export default Reviews;