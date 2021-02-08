import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import './settings-account.styles.scss';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser, selectChefSettings, selectChef, selectChefId } from "../../../redux/user/user.selectors";
import { setChef } from "../../../redux/user/user.actions";

class SettingsAccount extends React.Component {

	state = {
		name: false,
		dob: false,
		email: false,
		phone: false,
		password: false,
		editName: false,
		defaultName: false
	};

	formatDate = date => {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();

		if ( month.length < 2 )
			month = '0' + month;
		if ( day.length < 2 )
			day = '0' + day;

		return [year, month, day].join('-');
	}

	handleClickEditName = () => {
		this.setState({
			editName: !this.state.editName,
			defaultName: this.state.name
		});
	}

	handleOnChangeName = event => {
		const { value } = event.target;
		this.setState({
			name: value.trim()
		});
	}

	handleCancelEdit = () => {
		this.setState({
			editName: false,
			name: this.state.defaultName,
			defaultName: false
		});
	}

	handleSaveName = () => {
		const { chefId } = this.props;

		if ( this.state.name.trim() === '' ) {
			this.handleCancelEdit();
			return;
		}

		axios.post('/settings/updateChef', {
				 chefId: chefId,
				 name: this.state.name
			 })
			 .then(response => response.data)
			 .then(data => {
				 this.props.setChef(data.chef);
				 this.setState({
					 editName: false,
					 defaultName: false
				 })
			 })
			 .catch(err => {
				 console.log(err.response);
			 });
	}

	render() {
		const currentUser = this.props.currentUser;
		const chef = this.props.chef;

		return (
			<div className="settings_account_inner">
				<div className="settings_account_item">
					<div className='settings_item_flex'>
						<div className="settings_account_static medium_sofia">NAME</div>
						{
							!this.state.editName ?
								<div className="settings_account_edit_btn medium_sofia"
									 onClick={ this.handleClickEditName }>Edit</div>
								:
								this.state.name !== this.state.defaultName ?
									<div className="settings_account_edit_btn medium_sofia"
										 onClick={ this.handleSaveName }>Save</div>
									:
									<div className="settings_account_edit_btn medium_sofia"
										 onClick={ this.handleCancelEdit }>Cancel</div>

						}
					</div>
					{
						this.state.editName ?
							<input type="text" name="address"
								   defaultValue={ currentUser.chef.name }
								   onChange={ this.handleOnChangeName }
								   className="edit_input address-new-del-section regular_sofia"
								   placeholder="Enter name"/>
							:
							<div className="settings_account_dynamic settings_name_dynamic regular_sofia">
								{ currentUser.chef.name }
							</div>
					}


				</div>
				{/*<div className="settings_account_item">*/ }
				{/*	<div className='settings_item_flex'>*/ }
				{/*		<div className="settings_account_static medium_sofia">DOB</div>*/ }
				{/*		<div className="settings_account_edit_btn medium_sofia">Edit</div>*/ }
				{/*	</div>*/ }
				{/*	<div className="settings_account_dynamic settings_name_dynamic regular_sofia">*/ }
				{/*		{*/ }
				{/*			chefSettings.dob ?*/ }
				{/*				chefSettings.dob*/ }
				{/*				:*/ }
				{/*				''*/ }
				{/*		}*/ }
				{/*	</div>*/ }
				{/*</div>*/ }
				<div className="settings_account_item">
					<div className="settings_account_static medium_sofia">EMAIL</div>
					<div
						className="settings_account_dynamic settings_birth_dynamic regular_sofia">{ currentUser.user.email }</div>
				</div>
				<div className="settings_account_item">
					<div className='settings_item_flex'>
						<div className="settings_account_static medium_sofia">PHONE</div>
						{/*<div className="settings_account_edit_btn medium_sofia">Edit</div>*/ }
					</div>
					<div
						className="settings_account_dynamic settings_name_dynamic regular_sofia">{ chef.phoneNo }</div>
				</div>
				{/*<div className="settings_account_item settings_item_flex">*/ }
				{/*	<div className="settings_account_static medium_sofia">PASSWORD</div>*/ }
				{/*	<div className="settings_account_edit_btn medium_sofia">Edit</div>*/ }
				{/*</div>*/ }
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser,
	chefSettings: selectChefSettings,
	chef: selectChef,
	chefId: selectChefId
});

const mapDispatchProps = dispatch => ({
	setChef: chef => dispatch(setChef(chef))
});

export default connect(mapStateToProps, mapDispatchProps)(SettingsAccount);