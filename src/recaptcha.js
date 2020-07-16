const uuid = require('uuid');

class Recaptcha {
  constructor() {
    this.dataset = {};
    this.captcha = {};
  }

  answer(id, answer) {

  }

  client(request, response, next) {

  }

  generateId() {
    let id = uuid.v4();

    if (Object.prototype.hasOwnProperty.call(this.captcha, id)) {
      return this.generateId();
    }

    this.captcha[id] = {
      generatedAt: null,
      puzzleAnswer: null,
      puzzleData: null,
      puzzleExample: null,
      puzzleQuestion: null,
      solvedAt: null,
    };

    return id;
  }

  generatePuzzle(id) {
    if (Object.prototype.hasOwnProperty.call(this.captcha, id)) {
      
    } else {
      throw 'Captcha id from .generatePuzzle(id) doesn\'t exist.';
    }
  }

  setOptions(options) {
    if (!(options && (typeof options === 'object'))) {
      throw `Invalid argument 'options' (expected: object | found: ${typeof(options)})`;
    }

    if (
      Object.prototype.hasOwnProperty.call(options, 'dataset')
      && ((typeof options.dataset) === "object")
    ) {
      this.dataset = options.dataset;
    }
  }

  verify(request, response, next) {

  }
}

module.exports = Recaptcha;
