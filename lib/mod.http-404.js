const Promise = require('bluebird');

const plugin = () => (requestPath, res, req) => new Promise(resolve => {
	const data = {
		filename: req.originalUrl
	};

	// Pass Back to HTTP Request Handler or HTTP Exporter
	const payload = {
		statusCode: 404,
		contentType: 'text/html',
		data
	};

	resolve(payload);
});

module.exports = {
	name: 'markserv-contrib-mod.http-404',

	// `templateUrl` loads into `template` when the server starts up
	// templatePath is relative to the Markconf.js file that loads it
	templateUrl: 'mod.http-404.html',

	// `plugin` function responds to a http request
	// main MUST always returns a promise
	plugin
};
