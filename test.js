const app = require('express')();

const recaptcha = require('./index.js');
recaptcha.setOptions({ dataset: recaptcha.dataset });

app.use('/recaptcha/client', recaptcha.client);
app.use('/recaptcha/dataset', recaptcha.dataset.image);
app.use('/recaptcha/server', recaptcha.server);

app.listen(80);
