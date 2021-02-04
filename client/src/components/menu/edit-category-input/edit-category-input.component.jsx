import React from 'react';
import { FaChevronDown, FaChevronUp, FaTrash } from "react-icons/all";
import { connect } from 'react-redux';
import axios from "axios";

import './edit-category-input.styles.scss';

import { selectChefId } from "../../../redux/user/user.selectors";
import { createStructuredSelector } from "reselect";

class EditCategoryInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			name: props.category.name,
			index: props.category.index,
			showItem: !!props.category.new
		};

		this.handleOpenDetails = this.handleOpenDetails.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleOpenDetails() {
		this.setState({
			showItem: !this.state.showItem
		});
	}

	handleChange(e) {
		this.props.handleChange(this.state.index, e.target.value);
	}

	handleDeleteCategory = () => {
		const { chefId } = this.props;
		const categoryIndex = this.state.index;
	}

	render() {

		return (
			<div className="editCategoryRow">
				<div className="popup_menu_title">
					<p className="category_menu_title medium_sofia">MENU TITLE - { this.state.index + 1 }</p>
					{
						this.state.showItem ? (
								<div>
									<FaChevronUp className='arrow_close_menu_details' onClick={ this.handleOpenDetails }/>
									<input placeholder="" type="text" defaultValue={ this.state.name }
										   className="input_menu_title sb_sofia" onChange={ this.handleChange }/>
								</div>
							)
							:
							<FaChevronDown className='arrow_open_menu_details' onClick={ this.handleOpenDetails }/>
					}
				</div>
				<FaTrash className='trash_icon_btn' onClick={ this.handleDeleteCategory }/>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	chefId: selectChefId
});

export default connect(mapStateToProps)(EditCategoryInput);