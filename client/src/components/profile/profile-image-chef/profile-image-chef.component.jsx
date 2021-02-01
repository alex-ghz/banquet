import React from 'react';
import { FaCamera } from "react-icons/all";
import { connect } from 'react-redux';

import './profile-image-chef.styles.scss';

import { selectChef, selectChefId } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";
import axios from "axios";
import Swal from "sweetalert2";

class ProfileImageChef extends React.Component {

	state = {
		profileImg: null,
	};

	componentDidMount() {
		const chef = this.props.chef;
		const chefImage = chef.profilePhotoURL;

		if ( chefImage ) {
			this.setState({
				profileImg: chefImage
			});
		}
	}

	handleUpload = (event) => {
		this.setState({
			previousUrl: this.state.profileImg,
			profileImg: URL.createObjectURL(event.target.files[0]),
			imageFile: event.target.files[0]
		}, () => {
			setTimeout(() => {
				const img = this.state.imageFile;
				const form = new FormData();

				form.append('image', img, img.name);

				axios.post('/upload/image', form, { headers: { 'Content-Type': 'multipart/form-data' } })
					 .then(result => result.data)
					 .then(data => data.url)
					 .then(url => {
						 this.setState({
							 profileImg: url,
							 imageFile: null
						 }, () => {
							 //@TODO update chef client
							 this.props.handleChange("profileImage", {
								 url: this.state.profileImg
							 });
						 });
					 })
					 .catch(err => {
						 this.setState({
							 profileImg: this.state.previousUrl,
							 imageFile: null
						 });

						 Swal.fire({
							 icon: 'error',
							 title: 'Oops...',
							 text: err.response.data.err,
						 });
					 });
			}, 300);
		})
	}

	render() {

		return (
			<div className="profileSection">
				<div className="profileText">
					<p className="first_profile_paragraph bold_sofia">PROFILE PICTURE</p>
					<p className="gs_paragraph regular_sofia">Choose a profile picture of yourself</p>
				</div>
				<div>
					{
						this.state.profileImg ?
							<label htmlFor="profileSectImg">
								<div className="profileSectionImg">
									<img className="profileImgLogged" name="image" src={ this.state.profileImg }
										 alt="Profile"/>
								</div>
							</label>
							:
							<label htmlFor="profileSectImg">
								<div className="profileSectionImg">
									<FaCamera/>
								</div>
							</label>
					}
					<input id="profileSectImg" className="imgFile" type="file"
						   onChange={ this.handleUpload }/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	chef: selectChef,
	chefId: selectChefId
});

export default connect(mapStateToProps)(ProfileImageChef);