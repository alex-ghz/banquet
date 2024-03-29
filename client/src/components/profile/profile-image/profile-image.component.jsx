import React from 'react';
import { FaCamera } from "react-icons/all";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import axios from "axios";
import Swal from 'sweetalert2';
import ProfileExample from '../../../assets/images/profileExample.jpeg';

import './profile-image.styles.scss';

import { selectChef, selectChefId } from "../../../redux/user/user.selectors";

class ProfileImage extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			profileImg: null,
		};

		this.handleProfileImgUpload = this.handleProfileImgUpload.bind(this);
	}

	componentDidMount() {
		const chef = this.props.chef;
		const chefImage = chef.menuImage;

		if ( chefImage ) {
			this.setState({
				profileImg: chefImage
			});
		}
	}

	handleProfileImgUpload(event) {
		this.setState({
			previousUrl: this.state.profileImg,
			profileImg: URL.createObjectURL(event.target.files[0]),
			imageFile: event.target.files[0]
		}, () => {

			setTimeout(() => {
				const image = this.state.imageFile;
				const form = new FormData();

				form.append('image', image, image.name);

				axios.post('/upload/image', form, { headers: { 'Content-Type': 'multipart/form-data' } })
					 .then(result => result.data)
					 .then(data => data.url)
					 .then(url => {
						 this.setState({
							 profileImg: url,
							 imageFile: null
						 }, () => {
							 //@TODO update chef client
							 this.props.handleChange("image", {
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

		});
	}

	render() {

		return (
			<div>
				<div className="profile_section_border">
					<p className="first_profile_paragraph bold_sofia">MAIN MENU IMAGE</p>
					<p className="gs_paragraph regular_sofia">Choose a main image for your menu, that is high quality
						and represents the best of what you have to offer. This will be the first thing people see when
						they view your profile on the app so make it count!</p>
				</div>
				<div className="profile_section_border">
					<p className="first_profile_paragraph medium_sofia p_other_color">MAIN MENU IMAGE</p>
					<div className="special">
						{
							this.state.profileImg ?
								<label htmlFor="profileImg">
									<div className="main_profile_img">
										<img className="profileImgLogged" name="image" src={ this.state.profileImg }
											 alt="Profile"/>
									</div>
								</label>
								:
								<label htmlFor="profileImg">
									<div className="main_profile_img">
										<FaCamera/>
									</div>
								</label>
						}
						<input id="profileImg" className="imgFile" type="file"
							   onChange={ this.handleProfileImgUpload }/>
						<span className="arrows">&#8644;</span>
						<img src={ ProfileExample } className="profileExample" alt=""/>
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

export default connect(mapStateToProps)(ProfileImage);