const markserv = require.main.exports.plugin;

const Promise = require('bluebird');
const Handlebars = require('handlebars');

markserv(plugin => {
  const compileTemplate = model => {
    const template = Handlebars.compile(plugin.template);
    const result = template(model);
    return result;
  };

  return (requestPath, res, req) => {
    return new Promise((resolve, reject) => {
      const model = Object.assign(plugin.Markconf, {
        filename: req.originalUrl
      });

      const result = compileTemplate(model);

      // Pass Back to HTTP Request Handler or HTTP Exporter
      const payload = {
        statusCode: 200,
        contentType: 'text/html',
        data: result
      };

      resolve(payload);
    });
  };
});
