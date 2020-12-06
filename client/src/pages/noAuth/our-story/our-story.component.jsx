import React from 'react';

import './our-story.styles.scss';

const OurStoryPage = () => (
	<div>
		<div className="site_page_title_container">
			<div className="site_page_title site_page_title_new bold_sofia">
				Our Story
			</div>
		</div>
		<div className="story_page_inner">
			<div className="story_page_section">
				<div className="story_page_section_title bold_sofia">
					Where it all started..
				</div>
				<div className="story_page_section_content">
					<div className="story_page_image"/>
					<div className="story_page_text_container_first">
						<p className="story_page_text regular_sofia">
							When Banquet’s co-founder and CEO Benjamin Appleby began selling home-made Caribbean dishes
							with his partner Kiana in 2018, he soon realised the potential for a home-chef marketplace.
							He made it his personal mission to bring together home-chefs with their communities, one
							dish at a time.
						</p>
						<p className="story_page_text regular_sofia">
							Our platform brings home-cooked meals from local chefs to the people in their community,
							which the customer can order and track on our app. We give people who partner with us as a
							Banquet Chef the opportunity to earn a substantial income - be it part-time or full time. No
							bosses, no schedule - just you and your saucepan. (And we’ll be there every step of the
							way).
						</p>
					</div>
				</div>
			</div>
			<div className="story_page_section">
				<div className="story_page_section_title bold_sofia">
					Where we are now..
				</div>
				<div className="story_page_section_content">
					<div className="story_page_text_container_second">
						<p className="story_page_text regular_sofia">
							Hooray! we’re up and away - our platform is launched and readily available in cities and
							towns across the UK from Edinburgh to Eastbourne. We’re currently rolling out new features
							including fully integrated inventory management as well as providing access to accounting
							software to handle the entire business process, making life that little bit easier for our
							wonderful chef’s.
						</p>
						<p className="story_page_text regular_sofia">
							Our curious foodies can look forward to an ever increasing selection of authentic,
							international cuisine created within our vibrant Banquet community.
						</p>
					</div>
					<div className="story_page_image_second"/>
				</div>
			</div>
			<div className="story_page_section">
				<div className="story_page_section_title story_page_section_title_last bold_sofia">
					Where we’re heading
				</div>
				<div className="story_page_section_content_last">
					<div className="story_page_image_third"/>
					<p className="story_page_text regular_sofia">
						To the moon of course! well, maybe in the future but for now we’re focusing on expanding
						throughout cities across Europe and the U.S shortly, to provide the freedom and discovery of the
						Banquet to our fellow human friends throughout the world. After all, food is better shared.
					</p>
					<p className="story_page_text regular_sofia">
						As well as growing our platform, Banquet will be investing vertically in our own sustainable
						farms and innovative retail spaces to create more exciting opportunities and experiences for our
						community. This will include our first fully automated grocery store expected to be ready in
						2021. We’re so excited to share our journey with you and we hope you will become a part of it.
					</p>
					<p className="story_page_text regular_sofia">
						As well as growing our organisation, we will be supporting an ever growing list of non-profit
						innitiatves aimed at bringing food, water and prosperity to those of us who are in less
						fortunate circumstances to ourselves. Lets make the world a better place, together.
					</p>
				</div>
			</div>
		</div>
	</div>
);

export default OurStoryPage;