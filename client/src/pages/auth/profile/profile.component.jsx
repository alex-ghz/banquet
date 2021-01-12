import React from 'react';

import './profile.styles.scss';

import ProfileImage from "../../../components/profile/profile-image/profile-image.component";
import ProfileDescription from "../../../components/profile/profile-description/profile-description.component";
import ProfileDelivery from "../../../components/profile/profile-delivery/profile-delivery.component";
import ProfileCategory from "../../../components/profile/profile-category/profile-category.component";
import WithSpinner from "../../../components/with-spinner/with-spinner.component";

const SaveButton = (props) => (<div className="save_btn_profile bold_sofia" onClick={props.onClick}>Save changes</div>);
const SaveWithSpinner = WithSpinner(SaveButton);

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
			category: null
		}

		this.handleChanges = this.handleChanges.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	handleChanges(path, obj) {
		this.setState({
			[path]: obj
		});
	}

	handleSave() {
		console.log(this.state);
	}

	render() {
		return (
			<div className='profile_section'>
				<div className="profile_section_title bold_sofia">
					My Chef Profile
				</div>
				<div className='profile_section_inner'>
					<ProfileImage handleChange={ this.handleChanges }/>
					<ProfileDescription handleChange={ this.handleChanges }/>
					<ProfileDelivery handleChange={ this.handleChanges }/>
					<ProfileCategory/>
					<div className="last_section_profile">
						<div className="profile_updated_last medium_sofia">Last Updated on 12/05/2020</div>
						<SaveWithSpinner isLoading={ false } onClick={ this.handleSave }/>
					</div>
				</div>
			</div>
		);
	}
}

export default Profile;