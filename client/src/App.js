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
						</div>
				}
			</div>
		);
	}
}

export default App;
