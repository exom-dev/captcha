/*
class Captcha extends HTMLDivElement {
  constructor() {
    // Always call super first in constructor
    super();

    this.innerHTML = 'test';
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));

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

window.customElements.define('exm-captcha', Captcha);
*/

class ExmCaptcha extends HTMLElement {
  constructor() {
    super();

    this.options = {
      endpoint: '/captcha',
      expires: 1000 * 30,
      name: 'exm-captcha',
      solveIn: 1000 * 60,
    }

    if (this.getAttribute('endpoint') !== null) {
      this.options.endpoint = this.getAttribute('endpoint');

      if (this.options.endpoint.endsWith('/')) {
        this.options.endpoint = this.options.endpoint.slice(0, -1);
      }
    }

    if (this.getAttribute('expires') !== null) {
      this.options.expires = parseInt(this.getAttribute('expires'));
      
      if (isNaN(this.options.expires)) {
        throw "Invalid attribute 'expires' (expected: number | found: string)";
      }
    }

    if (this.getAttribute('name') !== null) {
      this.options.name = this.getAttribute('name');
    }

    if (this.getAttribute('solveIn') !== null) {
      this.options.solveIn = parseInt(this.getAttribute('solveIn'));

      if (isNaN(this.options.solveIn)) {
        throw "Invalid attribute 'solveIn' (expected: number | found: string)";
      }
    }

    this.captcha = {
      category: null,
      data: null,
      example: null,
      generatedAt: null,
      id: null,
      solvedAt: null,
    };

    this.checkbox = null;
    this.dropdown = null;
    this.input = null;
    
    this.init();
    this.dropdownOpen();
  }

  async generate() {
    if (this.captcha.id === null) {
      this.captcha = await this.request('/');
    } else {
      this.captcha = await this.request(`/${this.captcha.id}`);
    }
  }

  init() {
    this.innerHTML = `
      <input name="${this.options.name}" type="hidden" />
      <input class="exm-captcha__checkbox" type="checkbox" required />
    `;

    this.input = this.children[0];
    this.checkbox = this.children[1];
  }

  dropdownClose() {
    if (this.dropdown !== null) {
      this.dropdown.parentElement.removeChild(this.dropdown);
      this.dropdown = null;
    }
  }

  async dropdownLoad() {
    if (this.dropdown !== null) {
      this.dropdown.classList.add('exm-captcha__dropdown--is-loading');
      await this.generate();

      this.dropdown.classList.remove('exm-captcha__dropdown--is-loading');
      this.dropdownRender();
    }
  }

  dropdownOpen() {
    if (this.dropdown === null) {
      this.dropdown = document.createElement('div');
      this.dropdown.classList.add('exm-captcha__dropdown');

      this.appendChild(this.dropdown);
      this.dropdown = this.children[2];

      this.dropdownLoad();
    }
  }

  dropdownRender() {
    if (this.dropdown !== null) {
      this.dropdown.innerHTML = `
        <div class="exm-captcha__dropdown__header">
          Pick each image containing a <b>${this.captcha.category}</b>
        </div>
        <div class="exm-captcha__dropdown__example">
          ${
            this.captcha.example.map((image) => {
              return `<img src="${this.options.endpoint}/${image}" />`;
            }).join()
          }
        </div>
      `;
    }
  }

  async request(uri, body = {}) {
    const response = await fetch(this.options.endpoint + uri, {
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'post',
    });

    return await response.json();
  }
}

window.customElements.define('exm-captcha', ExmCaptcha);
