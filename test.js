const express = require('express');
const app = express();

app.use(express.json());

const captcha = require('./index.js');
captcha.setOptions({ dataset: captcha.dataset.sample });

app.use('/captcha', captcha.client);
app.use('/captcha', captcha.server);
app.use('/captcha', captcha.dataset);

app.listen(8080);
