import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import SideMenu from "./components/sidemenu/sidemenu/sidemenu.component";

import HomePage from "./pages/auth/homepage/homepage.component";
import Reviews from "./pages/auth/reviews/reviews.component";
import Orders from "./pages/auth/orders/orders.component";
import Profile from "./pages/auth/profile/profile.component";
import Settings from "./pages/auth/settings/settings.component";

import Header from "./components/header/header.component";
import IndexPage from "./pages/noAuth/index/index.component";
import OurStoryPage from "./pages/noAuth/our-story/our-story.component";
import HowItWorksPage from "./pages/noAuth/how-it-works/how-it-works.component";
import Footer from "./components/footer/footer.component";

class App extends React.Component {
	state = {
		currentUser: null
	};

	render() {
		return (
			<div>
				{
					this.state.currentUser ?
						<div className='app'>
							<SideMenu/>
							<div className='content'>
								<Switch>
									<Route exact path='/home' component={ HomePage }/>
									<Route exact path='/home/reviews' component={ Reviews }/>
									<Route exact path='/orders' component={ Orders }/>
									<Route exact path='/profile' component={ Profile }/>
									<Route path='/settings' component={ Settings }/>
									<Redirect from='/' to='/home'/>
								</Switch>
							</div>
						</div>
						:
						<div className='appu'>
							<Header/>
							<Switch>
								<Route exact path='/' component={ IndexPage }/>
								<Route exact path='/our-story' component={ OurStoryPage }/>
								<Route exact path='/how-it-works' component={ HowItWorksPage }/>
							</Switch>
							<Footer/>
						</div>
				}
			</div>
		);
	}
}

export default App;
