import React from 'react';
import {FaArrowLeft} from "react-icons/all";
import {Link} from 'react-router-dom';

import './reviews.styles.scss';

import ReviewCard from "../../../components/reviews/review-card/review-card.component";

const Reviews = () => (
	<div>
		<div className="reviews_section">
			<div className="reviews_section_title bold_sofia">
				<Link to='/home'>
					<FaArrowLeft className='gs-arrow reviews_arrow'/>
				</Link>
				Reviews
			</div>
			<div className="flex_reviews">
				<ReviewCard/>
			</div>
		</div>
	</div>
);

export default Reviews;