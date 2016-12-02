const Promise = require('bluebird');
const Handlebars = require('handlebars');

const plugin = (plugin, markserv, options, Markconf) => {
	const compileTemplate = model => {
		const template = Handlebars.compile(plugin.template);
		const result = template(model);
		return result;
	};

	return (requestPath, res, req) => new Promise(resolve => {
		const model = Object.assign(Markconf, {
			filename: req.originalUrl
		});

		const result = compileTemplate(model);

		// Pass Back to HTTP Request Handler or HTTP Exporter
		const payload = {
			statusCode: 404,
			contentType: 'text/html',
			data: result
		};

		resolve(payload);
	});
};

module.exports = {
	name: 'markserv-contrib-mod.http-404',

	// Set default `options` here, can be overridden in Markconf.js
	options: {},

	// String HTML template used to render the view
	template: '',

	// `templatePath` loads into `template` when the server starts up
	// templatePath is relative to the Markconf.js file that loads it
	templatePath: 'mod.http-404.html',

	// `main` plugin function responds to a http request
	// main MUST always returns a promise
	plugin
};
