import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import SideMenu from "./components/sidemenu/sidemenu.component";
import HomePage from "./pages/homepage/homepage.component";
import Reviews from "./pages/reviews/reviews.component";

class App extends React.Component {
	state = {
		currentUser: null
	};

	render() {
		return (
			<div className='app'>
				<SideMenu/>
				<div className='content'>
					<Switch>
						<Route exact path='/home' component={ HomePage }/>
						<Route exact path='/home/reviews' component={ Reviews }/>
						<Redirect from='/' to='/home'/>
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
