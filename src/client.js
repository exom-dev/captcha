const express = require('express');
const path = require('path');

const app = express.Router();
const client = path.join(__dirname, '../client');

app.use(express.static(client));
module.exports = app;
