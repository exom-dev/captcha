const Recaptcha = require('./src/recaptcha.js');
module.exports = new Recaptcha();

module.exports.client = require('./src/client.js');
module.exports.server = require('./src/server.js');

module.exports.dataset = require('./src/dataset-sample.js');
module.exports.dataset.image = require('./src/dataset-image.js');

/*
const app = require('express')();

app.use('/recaptcha/dataset', module.exports.sample());
app.use('/recaptcha/client', module.exports.client());
app.use('/recaptcha', module.exports.server());

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(80);
*/
