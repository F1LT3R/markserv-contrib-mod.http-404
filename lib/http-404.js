const markserv = require.main.exports.plugin;

const Handlebars = require('handlebars');

markserv(plugin => {
  // console.log(plugin);

  const compileTemplate = model => {
    const template = Handlebars.compile(plugin.template);
    const result = template(model);
    return result;
  };

  return requestPath => {
    return new Promise((resolve, reject) => {

      const model = Object.assign(plugin.Markconf, {
        dir: requestPath,
        filename: requestPath
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
