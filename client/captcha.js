class Captcha {
  constructor(options) {
    this.options = {
      dataset: '/',
      endpoint: '/',
      expires: 1000 * 30,
      name: 'exm-captcha',
      solveIn: 1000 * 60,
    }

    this.checkbox = null;
    this.dropdown = null;
    this.element = null;
    this.id = Date.now().toString();

    this.setOptions(options);
  }

  init(wrapper) {
    wrapper.insertAdjacentHTML('beforeBegin', `
      <div class="exm-recaptcha" id="exm-recaptcha-${this.id}">
        <input name="${this.options.name}" type="hidden" />
        <label class="exm-recaptcha__im-not-robot">  
          <input class="exm-recaptcha__im-not-robot__checkbox" type="checkbox" required />
          I'm not a robot
        </label>
      </div>
    `);
  
    wrapper.parentElement.removeChild(wrapper);
    this.element = document.getElementById(`exm-recaptcha-${this.id}`);
    this.element.removeAttribute('id');

    document.onclick = () => {
      if (this.dropdown !== null) {
        this.close();
      };
    };

    this.checkbox = this.element.querySelector('input[type="checkbox"]');
    this.checkbox.onclick = (event) => {
      if (this.checkbox.checked) {
        event.stopPropagation();
        this.checkbox.checked = false;
        this.open();
      } else {
        this.checkbox.checked = true;
      }
    };
  }

  open() {
    if (this.dropdown === null) {
      this.checkbox.indeterminate = true;
  
      this.element.insertAdjacentHTML('beforeEnd', `
        <div class="exm-recaptcha__dropdown" id="exm-recaptcha-${this.id}">
          <div class="exm-recaptcha__dropdown__header">
            Please click each image containing a
            <b class="exm-recaptcha__dropdown__header__category">crosswalk</b>
          </div>

        </div>
      `);

      this.dropdown = document.getElementById(`exm-recaptcha-${this.id}`);
      this.dropdown.removeAttribute('id');
  
      this.dropdown.onclick = (event) => {
        event.stopPropagation();
      };
    }
  }

  close() {
    this.checkbox.indeterminate = false;

    if (this.dropdown !== null) {
      this.dropdown.parentElement.removeChild(this.dropdown);
      this.dropdown = null;
    }
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
