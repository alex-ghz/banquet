import React from 'react';

import './review-card.styles.scss';

const ReviewCard = () => (
	<div className="reviews_inner">
		<div className="reviews_inner_user_details">
			<div className="reviews_user_name bold_sofia">User Name</div>
			<div className="reviews_user_id bold_sofia">#001</div>
			<div className="reviews_date regular_sofia">36 mins ago</div>
		</div>
		<div className="reviews_inner_order regular_sofia">
			Ordered BBQ Chicken breast - Mac & Cheese
		</div>
		<div className="reviews_innew_review sb_sofia">
			Thank you! Love your BBQ Chicken. Mac & Cheese was delicious as always.
		</div>
		<div className="reviews_tags_insde">
			<div className="review_tag bold_sofia">Loved it!</div>
			<div className="review_tag bold_sofia">Great Service</div>
		</div>
	</div>
);

export default ReviewCard;