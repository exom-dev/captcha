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
          Please click each image containing a
          <b>${this.captcha.category}</b>
        </div>
        <div class="exm-captcha__dropdown__data">
          ${
            this.captcha.data.map((data) => {
              return `
                <img
                  class="exm-captcha__dropdown__data__image"
                  src="${this.options.endpoint}/${data}"
                />`;
            }).join('')
          }
        </div>
        <div class="exm-captcha__dropdown__footer">
          <div class="exm-captcha__dropdown__footer__action">
            <button type="button">Reload</button>
          </div>
          <div class="exm-captcha__dropdown__footer__submit">
            <button type="button">Skip</button>
          </div>
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
