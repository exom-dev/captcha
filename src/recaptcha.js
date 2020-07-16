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
      
    }
  
    throw 'EXM_RECAPTCHA_ID_NOT_FOUND';
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
      response.json(this.generateId());
    });

    const validation = {
      answer: (request, response, next) => {
        if (Object.prototype.hasOwnProperty.call(request.body, 'answer') === false) {
          return response.json({ status: 'EXM_RECAPTCHA_ANSWER_EMPTY' });
        }

        if (!(request.body.answer instanceof Array)) {
          return response.json({ status: 'EXM_RECAPTCHA_ANSWER_INVALID' });
        }

        next();
      },
      id: (request, response, next) => {
        if (Object.prototype.hasOwnProperty.call(request.body, 'id') === false) {
          return response.json({ status: 'EXM_RECAPTCHA_ID_EMPTY' });
        }

        if ((typeof request.body.id) !== 'string') {
          return response.json({ status: 'EXM_RECAPTCHA_ID_INVALID' });
        }

        next();
      }
    };

    app.post('/puzzle', validation.id, (request, response) => {
      const puzzle = this.generatePuzzle(request.body.id);
      puzzle.status = 'EXM_RECAPTCHA_OK';

      response.json(puzzle);
    });

    app.post('/solve', validation.id, validation.answer, (request, response) => {
      try {
        const solve = this.solvePuzzle(request.body.id);
        solve.status = 'EXM_RECAPTCHA_OK';
  
        response.json(solve);
      } catch (error) {
        response.json({ status: error });
      }
    });

    return app;
  }

  solvePuzzle(id, answer) {
    if (Object.prototype.hasOwnProperty.call(this.captcha, id)) {
      
    }
  
    throw 'EXM_RECAPTCHA_ID_NOT_FOUND';
  }
}

module.exports = Recaptcha;
