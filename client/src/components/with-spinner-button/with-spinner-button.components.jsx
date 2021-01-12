import React from 'react';

import {SpinnerContainer, SpinnerOverlay} from "./with-spinner-button.styles";

const WithSpinnerButton = WrappedComponent => ({isLoading, ...otherProps}) => {
	return isLoading ? (
		<SpinnerOverlay>
			<SpinnerContainer/>
		</SpinnerOverlay>
	) : (
		<WrappedComponent {...otherProps}/>
	);
};

export default WithSpinnerButton;