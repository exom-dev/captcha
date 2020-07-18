const app = require('express')();

const captcha = require('./index.js');
captcha.setOptions({ dataset: captcha.dataset.sample });

app.use('/captcha', captcha.client);
app.use('/captcha', captcha.server);
app.use('/captcha', captcha.dataset);

app.listen(8080);
