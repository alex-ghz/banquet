const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');

if ( process.env.NODE_ENV !== 'production' ) require('dotenv').config();

const apiRouter = require('./routes/api');

var app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
	console.log('DATABASE_URI not specified, falling back to localhost.');
}

const parse = new ParseServer({
	databaseURI: databaseUri || 'mongodb+srv://test:test@cluster0.mtjj2.mongodb.net/Chef?retryWrites=true&w=majority',
	appId: process.env.APP_ID || 'app',
	clientKey: 'X3Xst6lMyVpyqJKljyNBYlski5AUCemcLQ1Ap8OF',
	masterKey: process.env.MASTER_KEY || 'master', //Add your master key here. Keep it secret!
	serverURL: process.env.SERVER_URL || 'http://localhost:5000/parse',  // Don't forget to change to https if needed
	liveQuery: {
		classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
	},
	push: {
		ios: [
			{
				pfx: 'stagingDevelopment.p12', // Dev PFX or P12
				bundleId: process.env.BUNDLE_ID || '',
				production: false // Dev
			},
			{
				pfx: 'stagingDistribution.p12', // Prod PFX or P12
				bundleId: process.env.BUNDLE_ID || '',
				production: true // Prod
			}
		]
	}
});

// @TODO Set true when migrate from heroku to https server
const options = { allowInsecureHTTP: true };
const dashboard = new ParseDashboard({
	"apps": [
		{
			"serverURL": process.env.SERVER_URL || 'http://localhost:5000/parse',
			"appId": process.env.APP_ID || 'app',
			"masterKey": process.env.MASTER_KEY || 'master',
			"javascriptKey": "NOT USED",
			"restKey": "NOT USED",
			"appName": "Banquet"
		}
	],
	"users": [
		{
			"user":"username",
			"pass":"password"
		}
	],
	"trustProxy": 1
}, options);

app.use('/dashboard', dashboard);

if ( process.env.NODE_ENV === 'production' ) {
	app.use(express.static(path.join(__dirname, 'client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
	});
}

app.use('/api', apiRouter);
app.use('/parse', parse);

app.listen(port, error => {
	if ( error ) throw error;
	console.log('Server running on port ' + port);
});