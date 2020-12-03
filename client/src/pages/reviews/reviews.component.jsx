import React from 'react';
import {FaArrowLeft} from "react-icons/all";

import './reviews.styles.scss';

import ReviewCard from "../../components/review-card/review-card.component";

const Reviews = () => (
	<div>
		<div className="reviews_section">
			<div className="reviews_section_title bold_sofia">
				<FaArrowLeft className='gs-arrow reviews_arrow'/>
				Reviews
			</div>
			<div className="flex_reviews">
				<ReviewCard/>
			</div>
		</div>
	</div>
);

export default Reviews;