const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const app = express.Router();
const dataset = path.join(__dirname, '../dataset');

app.get('/:image', async (request, response, next) => {
  const image = path.join(dataset, request.params.image);

  if (await fs.pathExists(image)) {
    response.contentType('image/png');
    fs.createReadStream(image).pipe(response);
  }

  next();
});

module.exports = app;
