const Recaptcha = require('./src/recaptcha.js');
module.exports = new Recaptcha();

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