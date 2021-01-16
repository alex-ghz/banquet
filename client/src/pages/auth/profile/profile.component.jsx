import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";


import './profile.styles.scss';

import { selectChef, selectChefId } from "../../../redux/user/user.selectors";

import ProfileImage from "../../../components/profile/profile-image/profile-image.component";
import ProfileDescription from "../../../components/profile/profile-description/profile-description.component";
import ProfileDelivery from "../../../components/profile/profile-delivery/profile-delivery.component";
import ProfileCategory from "../../../components/profile/profile-category/profile-category.component";
import WithSpinnerButton from "../../../components/with-spinner-button/with-spinner-button.components";
import { createStructuredSelector } from "reselect";

const SaveButton = (props) => (<div className="save_btn_profile bold_sofia" onClick={ props.onClick }>Save changes</div>);
const SaveWithSpinner = WithSpinnerButton(SaveButton);

class Profile extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			image: {
				file: null
			},
			description: {
				description: ""
			},
			delivery: {
				selectedPostCode: null,
				address: null,
				delivery: false,
				pickup: false,
				deliveryRadius: 5
			},
			categories: [],
			submitted: false
		}

		this.handleChanges = this.handleChanges.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	componentDidMount() {
		const { chef } = this.props;

		this.setState({
			description: {
				description: !!chef.description ? chef.description : ''
			},
			delivery: {
				postcode: null,
				address: !!chef.address ? chef.address : "",
				delivery: !!chef.delivery ? chef.delivery : false,
				pickup: !!chef.pickup ? chef.pickup : false,
				deliveryRadius: !!chef.deliveryRadius ? chef.deliveryRadius : 5
			},
			categories: !!chef.cuisineType ? chef.cuisineType : [],
		});

		console.log(chef.description);
	}

	handleChanges(path, obj) {
		this.setState({
			[path]: obj
		});
	}

	handleSave() {
		this.setState({
			submitted: true
		});

		const chefId = this.props.chefId;
		const settings = this.state;
		const formData = new FormData();

		if ( !!settings.image.file ) {
			formData.append("file", settings.image.file);
			formData.append("fileAdded", JSON.stringify(true));
		} else {
			formData.append("fileAdded", JSON.stringify(false));
		}

		formData.append("description", settings.description.description);
		formData.append("delivery", JSON.stringify(settings.delivery));
		formData.append("categories", JSON.stringify(settings.categories));
		formData.append("chefId", chefId);

		axios.post('/profile/update', formData)
			 .then(response => console.log(response));

	}

	resizeImage(file) {

	}

	render() {
		const state = this.state;

		return (
			<div className='profile_section'>
				<div className="profile_section_title bold_sofia">
					My Chef Profile
				</div>
				<div className='profile_section_inner'>
					<ProfileImage handleChange={ this.handleChanges }/>
					<ProfileDescription state={ state.description } handleChange={ this.handleChanges }/>
					<ProfileDelivery state={ state.delivery } handleChange={ this.handleChanges }/>
					<ProfileCategory state={ state.categories } handleChange={ this.handleChanges }/>
					<div className="last_section_profile">
						<div className="profile_updated_last medium_sofia">Last Updated on 12/05/2020</div>
						<SaveWithSpinner isLoading={ this.state.submitted } onClick={ this.handleSave }/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	chef: selectChef,
	chefId: selectChefId
});

export default connect(mapStateToProps)(Profile);