import React from 'react';
import {FaCheck} from "react-icons/all";

import './settings-verification.styles.scss';

const SettingsVerification = () => (
	<div className="settings_verification_inner">
		<p className="settings_verification_text medium_sofia">Please upload an image or file of your food license and
			food hygiene certificate so we can verify your account. <span className="verification_bold bold_sofia">Verification takes up to an hour</span> -
			once verified you can begin selling your food to your community! </p>
		<div className="settings_verification_certificate">
			<div className="settings_certificate_title medium_sofia">
				FOOD LICENCE
				<div className="settings_certificate_photo"/>
			</div>
			<div className="settings_certificate_title medium_sofia">
				STATUS
				<div className="settings_certificate_status_type medium_sofia">
					Verified <br/>
					<span className="settings_cerficiate_status_date medium_sofia">06 / 06 /2019</span>
				</div>
			</div>
			<div className="settings_cerfiicate_status_checked">
				<FaCheck className='check_icon_certificate'/>
			</div>
		</div>
		<div className="settings_verification_certificate settings_verification_certificate_last">
			<div className="settings_certificate_title medium_sofia">
				FOOD HYGEINE CERTIFICATE
				<div className="settings_certificate_photo"/>
			</div>
			<div className="settings_certificate_title medium_sofia">
				STATUS
				<div className="settings_certificate_status_type medium_sofia">
					Verified <br/>
					<span className="settings_cerficiate_status_date medium_sofia">06 / 06 /2019</span>
				</div>
			</div>
			<div className="settings_cerfiicate_status_checked">
				<FaCheck className='check_icon_certificate'/>
			</div>
		</div>
	</div>
);

export default SettingsVerification;