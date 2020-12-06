import React from 'react';

import './orders-details.styles.scss';

const OrdersDetails = () => (
	<div className="order_section_right">
		<div className="order_right_inner">
			<div className="order_right_id sb_sofia">#000</div>
			<div className="order_details_first">
				<div className="order_details_first_box">
					<div className="order_static_title medium_sofia">ORDER TYPE</div>
					<div className="order_dynamic_text sb_sofia">DELIVERY</div>
				</div>
				<div className="order_details_first_box">
					<div className="order_static_title medium_sofia">DELIVERY TIME</div>
					<div className="order_dynamic_text sb_sofia">19:32</div>
				</div>
				<div className="order_details_first_box">
					<div className="order_static_title medium_sofia">CUSTOMER NAME</div>
					<div className="order_dynamic_text sb_sofia">Customer Name</div>
				</div>
			</div>
			<div className="order_details_second">
				<div className="order_details_second_box">
					<div className="order_second_box_left">
						<div className="order_static_title medium_sofia">DELIVERING TO</div>
						<div className="order_dynamic_text order_client_address sb_sofia">
							User address, street name, town, postcode
						</div>
					</div>
				</div>
				<div className="order_details_first_box box_other_height">
					<div className="order_static_title medium_sofia">CUSTOMER NOTE</div>
					<div className="order_dynamic_text sb_sofia">blah blah blah blah blah</div>
				</div>
			</div>
			<div className="order_details_third">
				<div className="order_details_third_title medium_sofia">
					ORDER DETAILS
				</div>
				<div className="order_panel_detail">
					<div className="order_panel_detail_left">
						<div className="order_panel_category sb_sofia">MAINS</div>
						<p className="product_qty medium_sofia">0 x</p>
					</div>
					<div className="order_panel_detail_right medium_sofia">
						<div className="order_panel_product_name">Dish Name</div>
						<div className="order_panel_product_price">£0.00</div>
					</div>
				</div>
				<div className="order_panel_detail">
					<div className="order_panel_detail_left">
						<div className="order_panel_category sb_sofia">SIDES</div>
						<p className="product_qty medium_sofia">0 x</p>
					</div>
					<div className="order_panel_detail_right medium_sofia">
						<div className="order_panel_product_name">Dish Name</div>
						<div className="order_panel_product_price">£0.00</div>
					</div>
				</div>
				<div className="order_panel_total medium_sofia">
					ORDER TOTAL <span className="order_total_price bold_sofia">£0.00</span>
				</div>
			</div>
			<div className="ready_food_btn bold_sofia">Food is ready</div>
		</div>
	</div>
);

export default OrdersDetails;