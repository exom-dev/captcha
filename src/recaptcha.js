const uuid = require('uuid');

class Recaptcha {
  constructor() {
    this.data = {};
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
      puzzleAnswer: null,
      puzzleData: null,
      puzzleQuestion: null,
      revokedAt: null,
      solvedAt: null,
    };
  }

  generatePuzzle(id) {
    if (Object.prototype.hasOwnProperty.call(this.captcha, id)) {
      
    } else {
      throw 'Captcha id from .generatePuzzle(id) doesn\'t exist.';
    }
  }

  revoke(id) {
    if (Object.prototype.hasOwnProperty.call(this.captcha, id)) {
      this.captcha[id].revokedAt = new Date();
    } else {
      throw 'Captcha id from .revoke(id) doesn\'t exist.';
    }
  }

  setData(data) {
    this.data = data;
  }

  verify(request, response, next) {

  }
}

module.exports = Recaptcha;