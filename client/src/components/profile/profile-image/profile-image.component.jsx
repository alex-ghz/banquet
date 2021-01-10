import React from 'react';
import { FaCamera } from "react-icons/all";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import axios from "axios";

import './profile-image.styles.scss';

import { selectChef, selectChefId } from "../../../redux/user/user.selectors";
import { setChefProfileImg } from "../../../redux/user/user.actions";

class ProfileImage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			profileImg: null,
			imageFile: null
		};

		this.handleProfileImgUpload = this.handleProfileImgUpload.bind(this);
		this.saveChefProfileImage = this.saveChefProfileImage.bind(this);
	}

	componentDidMount() {
		const chef = this.props.chef;
		const chefImage = chef.profilePhotoURL;

		if ( chefImage ) {
			this.setState({
				profileImg: chefImage
			});
		}
	}

	handleProfileImgUpload(event) {
		this.setState({
			profileImg: URL.createObjectURL(event.target.files[0]),
			imageFile: event.target.files[0]
		});

		this.saveChefProfileImage();
	}

	saveChefProfileImage() {
		setTimeout(() => {
			if ( !this.state.profileImg ) {
				return;
			}
			this.saveChefData("imageFile", "profileImg");
		}, 200)

	}

	saveChefData(statePath, key) {
		const chefId = this.props.chefId;
		const formData = new FormData();

		formData.append("key", key);
		formData.append("file", this.state[statePath]);
		formData.append("chefId", chefId);

		axios.post("/profile/saveData", formData)
			 .then(response => response.data)
			 .then(data => data.photoUrl)
			 .then(photoUrl => {
				 this.props.setProfileImage(photoUrl);
			 });
	}

	render() {

		return (
			<div>
				<div className="profile_section_border">
					<p className="first_profile_paragraph medium_sofia">MAIN PROFILE IMAGE</p>
					<p className="gs_paragraph regular_sofia">Choose a main profile Image (of your food, you and your
						food,
						where you cook!) that is high quality and represents the best of what you have to offer. This
						will be
						the first thing people see when they view your profile so make it count! For more tips on how to
						create
						a 5 star profile visit <span className="red_span">Chef’s Corner.</span></p>
				</div>
				<div className="profile_section_border">
					<p className="first_profile_paragraph medium_sofia p_other_color">MAIN PROFILE IMAGE</p>
					{
						this.state.profileImg ?
							<label htmlFor="profileImg">
								<div className="main_profile_img">
									<img src={ this.state.profileImg } alt="Profile"/>
								</div>
							</label>
							:
							<label htmlFor="profileImg">
								<div className="main_profile_img">
									<FaCamera/>
								</div>
							</label>
					}
					<input id="profileImg" className="imgFile" type="file" onChange={ this.handleProfileImgUpload }/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	chef: selectChef,
	chefId: selectChefId
});

const mapDispatchToProps = dispatch => ({
	setProfileImage: photoUrl => dispatch(setChefProfileImg(photoUrl))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileImage);