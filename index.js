const Captcha = require('./src/captcha.js');
module.exports = new Captcha();

module.exports.client = require('./src/client.js');
module.exports.server = require('./src/server.js');

module.exports.dataset = require('./src/dataset-sample.js');
module.exports.dataset.image = require('./src/dataset-image.js');
