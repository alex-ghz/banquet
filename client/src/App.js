import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import SideMenu from "./components/sidemenu/sidemenu.component";
import HomePage from "./pages/homepage/homepage.component";

class App extends React.Component {
	state = {
		currentUser: null
	};

	render() {
		return (
			<div className='app'>
				<SideMenu/>
				<Switch>
					<Route exact path='/home' component={ HomePage }/>
				</Switch>
			</div>
		);
	}
}

export default App;
