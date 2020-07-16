const express = require('express');
const path = require('path');
const fs = require('fs-extra');
const uuid = require('uuid');

class Recaptcha {
  constructor() {
    this.captcha = {};

    const samplePath = path.join(__dirname, '../dataset/sample/sample.json');
    this.dataset = fs.readJsonSync(samplePath);
  }

  check(id) {
    
  }

  client() {
    const app = express.Router();
    const clientDir = path.join(__dirname, '../client');
    
    app.use(express.static(clientDir));
    return app;
  }

  generateId() {
    let id = uuid.v4();

    if (Object.prototype.hasOwnProperty.call(this.captcha, id)) {
      return this.generateId();
    }

    this.captcha[id] = {
      generatedAt: null,
      puzzleAnswer: null,
      puzzleCategory: null,
      puzzleData: null,
      puzzleExample: null,
      solvedAt: null,
      verified: false,
    };

    return id;
  }

  generatePuzzle(id) {
    if (Object.prototype.hasOwnProperty.call(this.captcha, id)) {
      
    } else {
      throw 'Captcha id from .generatePuzzle(id) doesn\'t exist.';
    }
  }

  sample() {
    const app = express.Router();
    
    app.get('/:image', async (request, response, next) => {
      const sampleDir = path.join(__dirname, '../dataset/sample');
      const imagePath = path.join(sampleDir, request.params.image);

      if (request.params.image !== 'sample.json' && (await fs.pathExists(imagePath))) {
        response.contentType('image/png');
        fs.createReadStream(imagePath).pipe(response);
      } else {
        next();
      }
    });

    return app;
  }

  server() {
    const app = express.Router();
  
    app.post('/id', (request, response) => {
      response.json({
        data: this.generateId(),
        statusCode: 201
      });
    });
  
    app.post('/puzzle', (request, response) => {
      response.json({
        data: this.generatePuzzle(request.body.id),
        statusCode: 201
      });
    });
  
    app.post('/solve', (request, response) => {
      
    });
  }

  solve(id, answer) {

  }
}

module.exports = Recaptcha;
