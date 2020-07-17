class Recaptcha {
  constructor(options) {
    this.options = {
      dataset: '/',
      element: null,
      endpoint: '/',
      expires: 1000 * 30,
      id: Date.now().toString(),
      logo: 'data:image/png;base64,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',
      name: 'exm-recaptcha',
      solveIn: 1000 * 60,
    }

    this.setOptions(options);
  }

  init(wrapper) {
    wrapper.insertAdjacentHTML('beforeBegin', `
      <div class="exm-recaptcha" exm-recaptcha="${this.options.id}">
        <div class="exm-recaptcha__im-not-robot">  
          <label class="exm-recaptcha__im-not-robot__label">  
            <input class="exm-recaptcha__im-not-robot__label__checkbox" type="checkbox" />
            I'm not a robot
          </label>
        </div>
        <div class="exm-recaptcha__brand">
          <img class="exm-recaptcha__brand__logo" src="${this.options.logo}" />
          <div class="exm-recaptcha__brand__footer">
            <a class="exm-recaptcha__brand__footer__link" href="#" target="_blanc">License</a>
            <a class="exm-recaptcha__brand__footer__link" href="#" target="_blanc">Support</a>
          </div>
        </div>
      </div>
    `);
  
    wrapper.parentElement.removeChild(wrapper);
    this.element = document.querySelector(`[exm-recaptcha="${this.options.id}"]`);
  }

  setOptions(options) {
    if (!(options && (typeof options) === 'object')) {
      throw `Invalid argument 'options' (expected: object | found: ${typeof(options)})`;
    }

    if (options.dataset) {
      if ((typeof options.dataset) !== 'string') {
        throw `Invalid argument 'options.dataset' (expected: string | found: ${typeof(options.dataset)})`;
      }

      this.options.dataset = options.dataset;
    }

    if (options.endpoint) {
      if ((typeof options.endpoint) !== 'string') {
        throw `Invalid argument 'options.endpoint' (expected: string | found: ${typeof(options.endpoint)})`;
      }

      this.options.endpoint = options.endpoint;
    }

    if (options.expires) {
      if ((typeof options.expires) !== 'number') {
        throw `Invalid argument 'options.expires' (expected: number | found: ${typeof(options.expires)})`;
      }

      this.options.expires = options.expires;
    }

    if (options.logo) {
      if ((typeof options.logo) !== 'string') {
        throw `Invalid argument 'options.logo' (expected: string | found: ${typeof(options.logo)})`;
      }

      this.options.logo = options.logo;
    }

    if (options.name) {
      if ((typeof options.name) !== 'string') {
        throw `Invalid argument 'options.name' (expected: string | found: ${typeof(options.name)})`;
      }

      this.options.name = options.name;
    }

    if (options.solveIn) {
      if ((typeof options.solveIn) !== 'number') {
        throw `Invalid argument 'options.solveIn' (expected: number | found: ${typeof(options.solveIn)})`;
      }

      this.options.solveIn = options.solveIn;
    }
  }
}
