import React from 'react';
import { connect } from 'react-redux';
import axios from "axios";
import { createStructuredSelector } from "reselect";

import './profile-description.styles.scss';

import { selectChef, selectChefId } from "../../../redux/user/user.selectors";
import { setChefDescription } from "../../../redux/user/user.actions";

class ProfileDescription extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			description: "",
			initial: "",
			modified: false
		};

		this.handleOnChange = this.handleOnChange.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}

	componentDidMount() {
		const chef = this.props.chef;
		const description = chef.description;

		if ( !!description ) {
			this.setState({
				description: description,
				initial: description
			});
		}
	}

	handleOnChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value.trim(), modified: true });

		if ( this.state.initial === this.state.description ) {
			this.setState({
				modified: false
			});
		}
	}

	handleSave() {
		const chefId = this.props.chefId;

		axios.post('/profile/saveData', {
				 chefId: chefId,
				 key: 'description',
				 data: this.state.description
			 })
			 .then(response => response.data)
			 .then(data => {
				 if ( data.done ) {
					 this.props.setProfileDescription(this.state.description);
				 }

				 this.setState({
					 initial: this.state.description,
					 modified: false
				 });
			 });
	}

	render() {

		return (
			<div>
				<div className="profile_section_border">
					<p className="first_profile_paragraph medium_sofia">CHEF DESCRIPTION</p>
					<p className="gs_paragraph regular_sofia">This is a chance to tell people who you are, what you’re
						creating
						and what you love about it (favourite ingredients to cook with, an especially good dish…) Let
						people get
						to know you as a Banquet Chef in 500 characters or less. Show off!</p>
				</div>
				<div className="profile_section_border">
					<div className="profile_section_edit">
						<p className="first_profile_paragraph medium_sofia p_other_color">MY CHEF DESCRIPTION</p>
						{
							this.state.modified ?
								<p className="edit_btn_profile medium_sofia" onClick={ this.handleSave }>Save
									changes</p>
								:
								null
						}
					</div>
					<textarea name="description" className="chef_description_text regular_sofia"
							  placeholder="Hello! I am..."
							  defaultValue={ this.state.description }
							  onChange={ this.handleOnChange }/>
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
	setProfileDescription: description => dispatch(setChefDescription(description))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDescription);