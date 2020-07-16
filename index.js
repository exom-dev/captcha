const Recaptcha = require('./src/recaptcha.js');
module.exports = new Recaptcha();

const app = require('express')();

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(80);
