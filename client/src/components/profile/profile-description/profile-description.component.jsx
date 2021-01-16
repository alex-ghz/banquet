import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import './profile-description.styles.scss';

import { selectChef } from "../../../redux/user/user.selectors";

class ProfileDescription extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			description: ""
		};

		this.handleOnChange = this.handleOnChange.bind(this);
	}

	componentDidMount() {
		const chef = this.props.chef;
		const description = chef.description;

		if ( !!description ) {
			this.setState({
				description: description
			});
		}
	}

	handleOnChange(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value.trim() }, this.updateParent);
	}

	updateParent() {
		this.props.handleChange("description", {
			description: this.state.description
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
	chef: selectChef
});

export default connect(mapStateToProps)(ProfileDescription);