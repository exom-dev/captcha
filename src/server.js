const express = require('express');
const app = express.Router();

const { cloneDeep, isArray } = require('lodash');
const captcha = require('../index');

app.post('/', (request, response) => {
  const puzzle = cloneDeep(captcha.generate());

  delete puzzle.answer;
  delete puzzle.solvedAt;

  response.json(puzzle);
});

app.post('/:id', (request, response) => {
  const id = request.params.id;
  const puzzle = cloneDeep(captcha.regenerate(id));
  
  delete puzzle.answer;
  delete puzzle.solvedAt;
  
  response.json(puzzle);
});

app.post('/:id/solve', (request, response) => {
  const answer = request.body.answer;
  
  if (isArray(answer) === false) {
    throw `Bad request 'request.body.answer' (expected: array | found: ${typeof(answer)})`;
  }

  const id = request.params.id;
  response.json(captcha.solve(id, answer));
});

module.exports = app;
