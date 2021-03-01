import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { Howl, Howler } from 'howler';
import NotificationSound from './assets/sounds/good_notification.mp3';
import axios from "axios";

import './App.css';

import { selectCurrentUser, selectChefId } from './redux/user/user.selectors';

import SideMenu from "./components/sidemenu/sidemenu/sidemenu.component";

import HomePage from "./pages/auth/homepage/homepage.component";
import Reviews from "./pages/auth/reviews/reviews.component";
import Orders from "./pages/auth/orders/orders.component";
import Menu from "./pages/auth/menu/menu.component";
import Profile from "./pages/auth/profile/profile.component";
import Settings from "./pages/auth/settings/settings.component";

import Header from "./components/header/header.component";
import IndexPage from "./pages/noAuth/index/index.component";
import OurStoryPage from "./pages/noAuth/our-story/our-story.component";
import HowItWorksPage from "./pages/noAuth/how-it-works/how-it-works.component";
import Login from "./pages/noAuth/login/login.component";
import Register from "./pages/noAuth/register/register.component";
import Footer from "./components/footer/footer.component";
import TermsAndConditions from "./pages/noAuth/terms-and-conditions/terms-and-conditions.components";
import Privacy from "./pages/noAuth/privacy/privacy.component";
import { fetchOrdersStart, fetchOrdersStartAsync } from "./redux/orders/orders.actions";

class App extends React.Component {

	playSound = () => {
		const audio = new Howl({ src: [NotificationSound] });
		audio.play().resume();
	}

	render() {
		const { currentUser } = this.props;

		if ( !!currentUser ) {
			// let activated = currentUser.user.activated;
			//
			// if ( !!activated === false || activated === false ) {
			// 	localStorage.clear();
			// 	window.location.href = '/';
			// }

			let chefId = currentUser.user.objectId,
				chefEmail = currentUser.user.email,
				chefName = currentUser.chef.name,
				chefIdReal = currentUser.user.chef.objectId;

			window.Intercom('boot', {
				app_id: 'diyaphva',
				email: chefEmail,
				user_id: chefId,
				name: chefName
			});
			window.Intercom("update");

			setInterval(() => {
				axios.get(`/orders/new?chefId=${ chefIdReal }`)
					 .then(response => response.data)
					 .then(data => data.count)
					 .then(count => {
						 if ( count === 0 ) {
							 return;
						 }

						 let { fetchOrdersStartAsync, isFetching } = this.props;

						 if ( !isFetching ) {
							 fetchOrdersStartAsync(chefIdReal);
						 }

						 this.playSound();
					 })
					 .catch(err => {
					 })
			}, 4 * 60000);
		} else {
			window.Intercom('update', {
				"hide_default_launcher": true
			});
		}

		return (
			<div>
				{
					this.props.currentUser ?
						<div className='app'>
							<SideMenu/>
							<div className='content'>
								<Switch>
									<Route exact path='/home' component={ HomePage }/>
									<Route exact path='/home/reviews' component={ Reviews }/>
									<Route exact path='/orders' component={ Orders }/>
									<Route exact path='/menu' component={ Menu }/>
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
								<Route exact path='/login' component={ Login }/>
								<Route exact path='/register' component={ Register }/>
								<Route exact path='/terms-and-conditions' component={ TermsAndConditions }/>
								<Route exact path='/privacy' component={ Privacy }/>
								<Redirect from='*' to='/'/>
							</Switch>
							<Footer/>
						</div>
				}
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	// chefId: selectChefId,
	// chefEmail: selectUserEmail,
	// chefName: selectChefName
});

const mapDispatchToProps = dispatch => ({
	fetchOrdersStart: () => dispatch(fetchOrdersStart()),
	fetchOrdersStartAsync: chefId => dispatch(fetchOrdersStartAsync(chefId))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
