import React from 'react';

import './how-it-works.styles.scss';

const HowItWorksPage = () => (
	<div>
		<div className="site_page_title_container">
			<div className="site_page_title bold_sofia">
				How it works
			</div>
		</div>
		<div className="how_it_works">
			<div className="how_it_works_circles">
				<div className="circle"/>
				<div className="circle"/>
				<div className="circle"/>
				<div className="circle"/>
				<div className="circle"/>
				<div className="circle"/>
				<div className="circle"/>
			</div>
			<div className="works_page_inner">
				<div className="works_page_inner_element">
					<div className="works_page_left_circle"/>
					<div className="works_page_container works_first_container">
						<div className="works_page_cont_title sb_sofia">
							Download the app
						</div>
						<div className="works_page_cont_content medium_sofia">
							Download the banquet app via the app store. You can explore the app and discover what your
							local chefs are cooking up instantly before creating your account.
						</div>
					</div>
				</div>
				<div className="works_page_inner_element">
					<div className="works_page_left_circle"/>
					<div className="works_page_container">
						<div className="works_page_cont_title sb_sofia">
							Discover amazing dishes
						</div>
						<div className="works_page_cont_content medium_sofia">
							Explore the home page and discover amazing dishes and chef’s near you. You can preset
							whether you’d like delivery or to pick up, or leave your options open until you’ve found
							something tasty to order.
						</div>
					</div>
				</div>
				<div className="works_page_inner_element">
					<div className="works_page_left_circle"/>
					<div className="works_page_container">
						<div className="works_page_cont_title sb_sofia">
							Create an account
						</div>
						<div className="works_page_cont_content medium_sofia">
							Tap the profile icon in the top right corner of the home page to create an accout or to log
							in to an existing one. All you’ll need is your email address and you’re good to go!
						</div>
					</div>
				</div>
				<div className="works_page_inner_element">
					<div className="works_page_left_circle"/>
					<div className="works_page_container">
						<div className="works_page_cont_title sb_sofia">
							Placing an order
						</div>
						<div className="works_page_cont_content medium_sofia">
							Found something you fancy? Add it to your order, confirm and follow our simple checkout
							process. Your chosen Banquet Chef will begin preparing your dish!
						</div>
					</div>
				</div>
				<div className="works_page_inner_element">
					<div className="works_page_left_circle"/>
					<div className="works_page_container">
						<div className="works_page_cont_title sb_sofia">
							View your order status
						</div>
						<div className="works_page_cont_content medium_sofia">
							After your order is confirmed, you’ll be taken back to the home page where you can easily
							view the status of your order from the pop up tab. We’ll send you notifications if you exit
							the app to let you know when your food is on it’s way to you or ready for pickup.
						</div>
					</div>
				</div>
				<div className="works_page_inner_element">
					<div className="works_page_left_circle"/>
					<div className="works_page_container">
						<div className="works_page_cont_title sb_sofia">
							Tuck in!
						</div>
						<div className="works_page_cont_content medium_sofia">
							The most important step of them all… recieve your Banquet and enjoy!
						</div>
					</div>
				</div>
				<div className="works_page_inner_element">
					<div className="works_page_left_circle"/>
					<div className="works_page_container works_last_container">
						<div className="works_page_cont_title sb_sofia">
							Rate your experience
						</div>
						<div className="works_page_cont_content medium_sofia">
							The next time you open the app you can choose to leave a review of your food and experience,
							helping us to keep your local Banquet community enjoyable and of the highest quality.
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default HowItWorksPage;