const _ = require('lodash');
const uuid = require('uuid');

class Recaptcha {
  constructor() {
    this.captcha = {};
    this.options = {
      dataset: [],
      expires: 1000 * 30,
      solveIn: 1000 * 60,
    };
  }

  check(id) {
    if (_.has(this.captcha, id) === false) {
      throw "Invalid argument 'id' not found.";
    }

    if (this.captcha[id].solvedAt === null) {
      return false;
    }

    if (this.captcha[id].solvedAt + this.options.expires <= _.now()) {
      return false;
    }

    delete this.captcha[id];
    return true;
  }

  generate() {
    const id = uuid.v4();

    if (_.has(this.captcha, id)) {
      return this.generate();
    }

    this.captcha[id] = {
      generatedAt: null,
      answer: null,
      category: null,
      data: null,
      example: null,
      solvedAt: null,
    };

    return this.regenerate(id);
  }

  regenerate(id) {
    if (_.has(this.captcha, id) === false) {
      throw "Invalid argument 'id' not found.";
    }

    if (this.options.dataset.length < 2) {
      throw "Dataset should have at least 2 groups.";
    }

    for (const group of this.options.dataset) {
      if (group.data.length < 12) {
        throw "Dataset group data should have at least 12 values";
      }
    }

    this.captcha[id].generatedAt = _.now();

    const index = _.random(this.options.dataset.length);
    const group = this.options.dataset[index];

    this.captcha[id].category = group.category;
    
    this.captcha[id].answer = _.sampleSize(group.data, _.random(2, 6));
    this.captcha[id].answer = _.sortBy(this.captcha[id].answer);

    const example = _.difference(group.data, this.captcha[id].answer);
    this.captcha[id].example = _.sampleSize(example, 3);

    let data = _.filter(this.options.dataset, (_, jindex) => jindex !== index);
    data = _.flatMap(data, (group) => group.data);
  
    this.captcha[id].data = _.sampleSize(data, 9 - this.captcha[id].answer.length);
    return this.captcha[id];
  }

  solve(id, answer) {
    if (_.has(this.captcha, id) === false) {
      throw "Invalid argument 'id' not found.";
    }

    if (this.captcha[id].generatedAt + this.options.solveIn <= _.now()) {
      return false;
    }

    if (_.isEqual(this.captcha[id].answer, _.sortBy(answer))) {
      this.captcha[id].solvedAt = _.now();
      return true;
    }
  
    return false;
  }
}

module.exports = Recaptcha;
