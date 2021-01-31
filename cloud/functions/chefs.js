Parse.Cloud.define('getChefs', async (request) => {
	const { location } = request.params;
	let chefs = [];
	const ChefsQuery = new Parse.Query("Chef");

	chefs.push(...await ChefsQuery.find());

	return chefs.filter(chef => {

		if ( !!chef.attributes.location === false ) {
			return false;
		}

		const lat1 = location.lat || 0,
			lon1 = location.lon || 0,
			lat2 = chef.attributes.location.latitude,
			lon2 = chef.attributes.location.longitude;

		if ( getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) > 16 ) {
			return false;
		}

		return true;
	});

});

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);  // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2)
	;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180)
}