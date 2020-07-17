class Recaptcha {
  constructor(options) {
    this.options = {
      dataset: '/',
      element: null,
      endpoint: '/',
      expires: 1000 * 30,
      id: Date.now().toString(),
      name: 'exm-recaptcha',
      solveIn: 1000 * 60,
    }

    this.setOptions(options);
  }

  init(wrapper) {
    wrapper.insertAdjacentHTML('beforeBegin', `
      <div class="exm-recaptcha" exm-recaptcha="${this.options.id}" exm-recaptcha-status="idle">
        <input name="${this.options.name}" type="hidden" />
        <label class="exm-recaptcha__im-not-robot">  
          <input class="exm-recaptcha__im-not-robot__checkbox" type="checkbox" required />
          I'm not a robot
        </label>
        <div class="exm-recaptcha__credits">
          <a class="exm-recaptcha__credits__link" href="https://github.com/exom-dev/recaptcha" target="_blanc">ReCaptcha</a>
          powered by
          <a class="exm-recaptcha__credits__link" href="https://github.com/exom-dev" target="_blanc">Exom Dev</a>
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
