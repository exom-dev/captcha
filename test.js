const app = require('express')();

const recaptcha = require('./index.js');
recaptcha.setOptions({ dataset: recaptcha.dataset });

app.use('/r/client', recaptcha.client);
app.use('/r/dataset', recaptcha.dataset.image);
app.use('/r/server', recaptcha.server);

app.listen(80);
