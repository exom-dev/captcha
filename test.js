const app = require('express')();

const captcha = require('./index.js');
captcha.setOptions({ dataset: captcha.dataset });

app.use('/captcha/client', captcha.client);
app.use('/captcha/dataset', captcha.dataset.image);
app.use('/captcha/server', captcha.server);

app.listen(80);
