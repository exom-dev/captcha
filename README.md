# Getting started

## Installation

You can install Captcha just like any other npm package.

```bash
npm i @exom-dev/captcha --save
```

## Usage

### Simple example with sample dataset & javascript client

```javascript
// server.js
const express = require('express');
const fs = require('fs');
const captcha = require('@exom-dev/captcha');

const app = express();

// Captcha needs json body parser to work
app.use(express.json());

// Setting up the dataset with captcha images
captcha.setOptions({ dataset: captcha.dataset.sample });
app.use('/captcha', captcha.dataset);

// Add captcha server routes
app.use('/captcha', captcha.server);

// Optionally host javascript client files
app.use('/captcha', captcha.client);

// Add your own routes
app.get('/register', (request, response) => {
  fs.createReadStream(__dirname + '/example.html').pipe(response);
});

app.post('/register', (request, response) => {
  if (captcha.consume(request.body['exm-captcha']) === true) {
    // everything okay
  }

  response.redirect('/register');
});

app.listen(80);
```

```html
<!-- example.html -->
<!doctype html>
<html>
  <head>
    <!-- import captcha css file (default basic layout) -->
    <link href="/captcha/captcha.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <form action="/register" method="post">
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <label>
        <!-- treat exm-captcha tag as being an checkbox-input -->
        <exm-captcha></exm-captcha>
        I'm not a robot
      </label>
      <input type="submit" />
    </form>

    <!-- import captcha js file (it uses web components) -->
    <script src="/captcha/captcha.js"></script>
  </body>
</html>
```

### Options & defaults
```javascript
captcha.setOptions({
  dataset: null,
  expires: 1000 * 60, // 1 minute
  solveIn: 1000 * 30, // 30 seconds
});
```

### Create your own dataset
```javascript
captcha.setOptions({
  dataset: [
    {
      category: 'any category you want',
      data: ['1', '2', '3', ...]
    },
    {
      category: 'another category',
      data: ['4', '5', '6', ...]
    },
    ...
  ]
});
```

# Releases

[0.1.0](https://github.com/exom-dev/captcha/releases/tag/0.1.0) - July 20th, 2020

# License <a href="https://github.com/exom-dev/captcha/blob/master/LICENSE"><img align="right" src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT"></a>

This project was created by [The Exom Developers](https://github.com/exom-dev).

The Captcha project is licensed under the [MIT](https://github.com/exom-dev/captcha/blob/master/LICENSE) license.
