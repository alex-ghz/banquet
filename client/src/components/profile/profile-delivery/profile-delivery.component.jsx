import React from 'react';
import { FaShoppingBasket, FaCheck, FaPoundSign } from "react-icons/all";
import { connect } from 'react-redux';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import axios from "axios";

import './profile-delivery.styles.scss';
import { createStructuredSelector } from "reselect";
import { selectChef } from "../../../redux/user/user.selectors";

const animatedComponent = makeAnimated();

class ProfileDelivery extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			postcode: {
				value: null,
				label: null,
				latitude: null,
				longitude: null,
			},
			address: null,
			delivery: false,
			pickup: false,
			deliveryRadius: 5,
			deliveryCost: 0,
			pickupInstructions: ''
		};

		this.handleOnChangePostCode = this.handleOnChangePostCode.bind(this);
		this.handleOnChangeAddress = this.handleOnChangeAddress.bind(this);
		this.handleOnChangeCheckbox = this.handleOnChangeCheckbox.bind(this);
		this.handleRadiusChange = this.handleRadiusChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const { chef } = this.props;

		this.setState({
			postcode: !!chef.postcode ? {
				label: chef.postcode,
				value: chef.postcode
			} : "",
			address: !!chef.address ? chef.address : "",
			delivery: !!chef.delivery ? chef.delivery : false,
			pickup: !!chef.pickup ? chef.pickup : false,
			deliveryRadius: !!chef.deliveryRadius ? chef.deliveryRadius : 5,
			deliveryCost: !!chef.deliveryCost ? chef.deliveryCost : 0,
			pickupInstructions: !!chef.pickupInstructions ? chef.pickupInstructions : ''
		}, () => {
			if ( !!this.state.postcode.value ) {
				this.handleOnChangePostCode(this.state.postcode);
			}
		});
	}

	handleOnChangePostCode(postCode) {
		axios.get(`https://api.postcodes.io/postcodes/${ postCode.value }`)
			 .then(response => response.data)
			 .then(data => data.result)
			 .then(result => {
				 this.setState({
					 postcode: {
						 value: postCode.value,
						 label: postCode.label,
						 latitude: result.latitude,
						 longitude: result.longitude,
					 }
				 }, this.updateParent)
			 });
	}

	loadPostCodeOptions(inputText, cb) {
		axios.get(`https://api.postcodes.io/postcodes/${ inputText }/autocomplete`)
			 .then(response => response.data)
			 .then(data => data.result)
			 .then(result => {
				 if ( !!result ) {
					 cb(result.map(i => ({ label: i, value: i })));
				 } else {
					 cb([]);
				 }
			 });
	}

	handleOnChangeAddress(event) {
		const { value, name } = event.target;
		this.setState({ [name]: value.trim() }, this.updateParent);
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value }, this.updateParent);
	}

	handleOnChangeCheckbox(event) {
		const { name } = event.target;
		this.setState({ [name]: !this.state[name] }, this.updateParent);
	}

	handleRadiusChange(event) {
		const { value } = event.target;
		this.setState({
			deliveryRadius: parseInt(value, 10)
		}, this.updateParent);
	}

	updateParent() {
		this.props.handleChange("delivery", this.state);
	}

	render() {

		return (
			<div>
				<div className="profile_section_border">
					<p className="first_profile_paragraph bold_sofia">DELIVERY / COLLECTION OPTIONS</p>
					<div className="delivery_collection_div">
						<AsyncSelect
							className='postcode-selector'
							components={ animatedComponent }
							value={ { value: this.state.postcode.value, label: this.state.postcode.label } }
							onChange={ this.handleOnChangePostCode }
							placeholder={ "Enter postcode" }
							loadOptions={ this.loadPostCodeOptions }
						/>
					</div>
					{
						this.state.postcode.value ?
							(
								<div>
									<div className="delivery_collection_div">
										<input type="text" name="address"
											   className="profile_delivery_section address-new-del-section regular_sofia"
											   placeholder="Enter address" defaultValue={this.state.address} onChange={ this.handleOnChangeAddress }/>
									</div>
									{
										this.state.address ?
											(
												<div>
													<div className="delivery_collection_div">
														<label htmlFor="pickup_id" className="profile_collection_section regular_sofia">
															<FaShoppingBasket className='profile_icon'/>
															<div className="delivery_section_left_text">I am available
																for
																collections
															</div>
															{
																this.state.pickup ?
																	<div className="check_div_profile check_div_profile_sel">
																		<FaCheck className='chkMarkProfile'/>
																	</div>
																	:
																	<div className="check_div_profile"/>
															}
														</label>
														<input className="hiddenComp" type="checkbox" name="pickup" id="pickup_id" defaultValue={ this.state.pickup }
															   onChange={ this.handleOnChangeCheckbox }/>
													</div>
													{
														this.state.pickup ?
															<textarea name="pickupInstructions" className="chef_description_text regular_sofia"
																	  placeholder="Collection instructions..."
																	  defaultValue={ this.state.pickupInstructions }
																	  onChange={ this.handleChange }/>
																	  : null
													}

													<div className="delivery_collection_div">
														<label htmlFor="delivery_id" className="profile_delivery_section regular_sofia">
															<FaShoppingBasket className='profile_icon'/>
															<div className="delivery_section_left_text">I am providing deliveries</div>
															{
																this.state.delivery ?
																	<div className="check_div_profile check_div_profile_sel">
																		<FaCheck className='chkMarkProfile'/>
																	</div>
																	:
																	<div className="check_div_profile"/>
															}
														</label>
														<input className="hiddenComp" type="checkbox" name="delivery" id="delivery_id" defaultValue={ this.state.delivery }
															   onChange={ this.handleOnChangeCheckbox }/>
														<div className="delivery_colection_section_location medium_sofia">
															<div className="delivery-options-profile">
																<span className="delivery_radius regular_sofia">Set delivery radius</span>
																<div className="delivery_collection_select_inner">
																	<select value={ this.state.deliveryRadius } onChange={ this.handleRadiusChange } className="delivery_location regular_sofia">
																		<option value="5">5 miles</option>
																		<option value="10">10 miles</option>
																		<option value="15">15 miles</option>
																		<option value="20">20 miles</option>
																		<option value="25">25 miles</option>
																		<option value="30">30 miles</option>
																		<option value="35">35 miles</option>
																		<option value="40">40 miles</option>
																		<option value="45">45 miles</option>
																		<option value="50">50 miles</option>
																		<option value="55">55 miles</option>
																		<option value="60">60 miles</option>
																	</select>
																</div>
															</div>
															<div className="delivery-options-profile delivery-options-center">
																<span className="delivery_radius regular_sofia">Delivery cost (<FaPoundSign/>)</span>
																<div className="delivery_collection_select_inner">
																	<div className="delivery_section_right_text">
																		<input type="number" name="deliveryCost" className="input-cost regular_sofia" defaultValue={this.state.deliveryCost} onChange={ this.handleRadiusChange }/>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											)
											:
											null
									}
								</div>
							)
							: null
					}
				</div>
			</div>
		);

	}
}

const mapStateToProps = createStructuredSelector({
	chef: selectChef
});

export default connect(mapStateToProps)(ProfileDelivery);