import React from 'react';
import { FaCheck, FaExclamation } from "react-icons/all";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './settings-verification.styles.scss';

import axios from "axios";
import { setChefSettings } from "../../../redux/user/user.actions";
import { selectChefSettings, selectChef } from "../../../redux/user/user.selectors";

class SettingsVerification extends React.Component {

	state = {
		file1: null,
		file2: null,
		file3: null,
		map: {
			file1: 'food_license',
			file2: 'food_hygeine_certificate',
			file3: 'copy_of_id'
		}
	};

	onFileChange = (file, event) => {
		this.setState({ [file]: event.target.files[0] });
	}

	onFileChange1 = event => this.onFileChange('file1', event);
	onFileChange2 = event => this.onFileChange('file2', event);
	onFileChange3 = event => this.onFileChange('file3', event);

	onUploadFile = file => {
		const formData = new FormData();

		formData.append(
			"file",
			this.state[file]
		);

		axios.post("uploadFile", formData)
			 .then(response => response.data)
			 .then(response => response.fileUrl)
			 .then(response => {
				 this.updateChef(file, response);
			 });
	}

	updateChef = (file, fileUrl) => {
		let setChefSettings = this.props.setChefSettings;
		let settingsId = this.props.chef.settings.objectId;

		setChefSettings({
			...this.props.chefSettings,
			[`${ this.state.map[file] }_status`]: 'submitted',
			[`${ this.state.map[file] }_date`]: new Date()
		});

		axios.post('setChefFile', {
				 settingsId: settingsId,
				 file: this.state.map[file],
				 data: new Date(),
				 fileUrl: fileUrl
			 })
			 .then(response => {
				 console.log(response);
			 })
	}

	onUploadFile1 = () => this.onUploadFile('file1');
	onUploadFile2 = () => this.onUploadFile('file2');
	onUploadFile3 = () => this.onUploadFile('file3');

	fileData1 = () => {
		if ( this.state.file1 ) {
			return (
				<div className='file'>
					<span>{ this.state.file1.name }</span>
				</div>
			);
		}
	}

	fileData2 = () => {
		if ( this.state.file2 ) {
			return (
				<div className='file'>
					<span>{ this.state.file2.name }</span>
				</div>
			);
		}
	}

	fileData3 = () => {
		if ( this.state.file3 ) {
			return (
				<div className='file'>
					<span>{ this.state.file3.name }</span>
				</div>
			);
		}
	}

	getStatus = status => {
		switch ( status ) {
			case 'submitted':
				return 'Not Verified';
			case 'verified':
				return 'Verified';
			default:
				return 'Not Submitted';
		}
	}

	getStatusIcon = status => {
		switch ( status ) {
			case 'verified':
				return (
					<div className="settings_cerfiicate_status_checked">
						<FaCheck className='check_icon_certificate'/>
					</div>
				);
			default:
				return (
					<div className="settings_cerfiicate_status_error">
						<FaExclamation className='check_icon_certificate'/>
					</div>
				);

		}
	}

	getDate = (date) => {
		if ( !!date === false ) {
			return null;
		}

		date = new Date(date);
		const day = (date.getDate() < 10 ? '0' : '') + date.getDate(),
			month = (date.getMonth() < 10 ? '0' : '') + (date.getMonth() + 1),
			yead = date.getFullYear();

		return day + ' / ' + month + ' / ' + yead;
	}

	render() {
		let chefSettings = this.props.chefSettings;

		return (
			<div className="settings_verification_inner">
				<p className="settings_verification_text medium_sofia">Please upload an image or file of your food
					license and
					food hygiene certificate so we can verify your account. <span
						className="verification_bold bold_sofia">Verification takes up to an hour</span> -
					once verified you can begin selling your food to your community! </p>
				<div className="settings_verification_certificate">
					<div className="settings_certificate_title medium_sofia">
						FOOD LICENCE
						<div className='file_upload'>
							{
								this.state.file1 ?
									<div>
										<div className="save_btn_profile bold_sofia" onClick={ this.onUploadFile1 }>Save
											changes
										</div>
									</div>
									:
									<div className="container_button">
										<label className="save_btn_profile save_label bold_sofia"
											   htmlFor="file1">Upload</label>
										<input type="file" id="file1" className="file2"
											   onChange={ this.onFileChange1 }/>
									</div>
							}
							{ this.fileData1() }
						</div>
					</div>
					<div className="settings_certificate_title medium_sofia">
						STATUS
						<div className="settings_certificate_status_type medium_sofia">
							{ this.getStatus(chefSettings.food_license_status) }
							<br/>
							<span
								className="settings_cerficiate_status_date medium_sofia">{ this.getDate(chefSettings.food_license_date) }</span>
						</div>
					</div>
					{ this.getStatusIcon(chefSettings.food_license_status) }
				</div>
				<div className="settings_verification_certificate">
					<div className="settings_certificate_title medium_sofia">
						FOOD HYGEINE CERTIFICATE
						<div className='file_upload'>
							{
								this.state.file2 ?
									<div>
										<div className="save_btn_profile bold_sofia" onClick={ this.onUploadFile2 }>Save
											changes
										</div>
									</div>
									:
									<div className="container_button">
										<label className="save_btn_profile save_label bold_sofia"
											   htmlFor="file2">Upload</label>
										<input type="file" id="file2" className="file2"
											   onChange={ this.onFileChange2 }/>
									</div>
							}
							{ this.fileData2() }
						</div>
					</div>
					<div className="settings_certificate_title medium_sofia">
						STATUS
						<div className="settings_certificate_status_type medium_sofia">
							{ this.getStatus(chefSettings.food_hygeine_certificate_status) }
							<br/>
							<span
								className="settings_cerficiate_status_date medium_sofia">{ this.getDate(chefSettings.food_hygeine_certificate_date) }</span>
						</div>
					</div>
					{ this.getStatusIcon(chefSettings.food_hygeine_certificate_status) }
				</div>
				<div className="settings_verification_certificate settings_verification_certificate_last">
					<div className="settings_certificate_title medium_sofia">
						COPY OF ID
						<div className='file_upload'>
							{
								this.state.file3 ?
									<div>
										<div className="save_btn_profile bold_sofia" onClick={ this.onUploadFile3 }>Save
											changes
										</div>
									</div>
									:
									<div className="container_button">
										<label className="save_btn_profile save_label bold_sofia"
											   htmlFor="file3">Upload</label>
										<input type="file" id="file3" className="file2"
											   onChange={ this.onFileChange3 }/>
									</div>
							}
							{ this.fileData3() }
						</div>
					</div>
					<div className="settings_certificate_title medium_sofia">
						STATUS
						<div className="settings_certificate_status_type medium_sofia">
							{ this.getStatus(chefSettings.copy_of_id_status) }
							<br/>
							<span
								className="settings_cerficiate_status_date medium_sofia">{ this.getDate(chefSettings.copy_of_id_date) }</span>
						</div>
					</div>
					{ this.getStatusIcon(chefSettings.copy_of_id_status) }
				</div>
			</div>
		);
	}
}

const mapDispatchProps = dispatch => ({
	setChefSettings: settings => dispatch(setChefSettings(settings))
});


const mapStateToProps = createStructuredSelector({
	chefSettings: selectChefSettings,
	chef: selectChef
});

export default connect(mapStateToProps, mapDispatchProps)(SettingsVerification);