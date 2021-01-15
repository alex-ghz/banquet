import React from 'react';
import { FaShoppingBasket, FaCheck, FaLocationArrow } from "react-icons/all";
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import axios from "axios";

import './profile-delivery.styles.scss';

const animatedComponent = makeAnimated();

class ProfileDelivery extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedPostCode: null,
			address: null,
			delivery: false,
			pickup: false,
			deliveryRadius: 5
		};

		this.handleOnChangePostCode = this.handleOnChangePostCode.bind(this);
		this.handleOnChangeAddress = this.handleOnChangeAddress.bind(this);
		this.handleOnChangeCheckbox = this.handleOnChangeCheckbox.bind(this);
		this.handleRadiusChange = this.handleRadiusChange.bind(this);
	}

	handleOnChangePostCode(postCode) {
		this.setState({
			selectedPostCode: postCode
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

		this.setState({ [name]: value.trim() });
		this.props.handleChange("delivery", this.state);
	}

	handleOnChangeCheckbox(event) {
		const { name } = event.target;
		this.setState({ [name]: !this.state[name] });
		this.props.handleChange("delivery", this.state);
	}

	handleRadiusChange(event) {
		const { value } = event.target;
		this.setState({
			deliveryRadius: parseInt(value, 10)
		});
		this.props.handleChange("delivery", this.state);
	}

	render() {

		return (
			<div>
				<div className="profile_section_border">
					<p className="first_profile_paragraph medium_sofia">DELIVERY / COLLECTION OPTIONS</p>
					<div className="delivery_collection_div">
						<AsyncSelect
							className='postcode-selector'
							components={ animatedComponent }
							value={ this.state.selectedPostCode }
							onChange={ this.handleOnChangePostCode }
							placeholder={ "Enter postcode" }
							// isDisabled={ !!this.state.selectedPostCode }
							loadOptions={ this.loadPostCodeOptions }
						/>
					</div>
					{
						this.state.selectedPostCode ?
							(
								<div>
									<div className="delivery_collection_div">
										<input type="text" name="address"
											   className="profile_delivery_section address-new-del-section regular_sofia"
											   placeholder="Enter address" onChange={ this.handleOnChangeAddress }/>
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
																	<select value={this.state.deliveryRadius} onChange={this.handleRadiusChange} className="delivery_location regular_sofia">
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
															<div className="delivery-options-profile">
																<span class="delivery_radius regular_sofia">Delivery cost</span>
																<div class="delivery_collection_select_inner">
																	<div class="delivery_section_right_text">
																		<input type="number" class="input-cost regular_sofia"/>
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

export default ProfileDelivery;