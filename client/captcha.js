class ExmCaptcha extends HTMLElement {
  constructor() {
    super();

    this.options = {
      endpoint: '/captcha',
      expires: 1000 * 60,
      name: 'exm-captcha',
      solveIn: 1000 * 30,
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
    };

    this.checkbox = null;
    this.dropdown = null;
    this.input = null;
    this.solveTimeout = null;

    this.tryAgain = false;
    this.init();
  }

  async generate() {
    if (this.captcha.id === null) {
      this.captcha = await this.request('/');
      this.input.value = this.captcha.id;
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

    this.checkbox.onclick = (event) => {
      if (this.checkbox.checked) {
        this.checkbox.checked = false;
        this.checkbox.indeterminate = true;

        event.stopPropagation();
        this.dropdownOpen();
      } else {
        this.checkbox.checked = true;
      }
    }

    document.onclick = () => {
      if (this.dropdown !== null) {
        this.dropdownClose();
      }
    };
  }

  dropdownClose() {
    if (this.solveTimeout !== null) {
      clearInterval(this.solveTimeout);
    }

    this.checkbox.indeterminate = false;

    if (this.dropdown !== null) {
      this.dropdown.parentElement.removeChild(this.dropdown);
      this.dropdown = null;
    }
  }

  async dropdownLoad() {
    if (this.solveTimeout !== null) {
      clearInterval(this.solveTimeout);
    }

    if (this.dropdown !== null) {
      this.dropdown.classList.add('exm-captcha__dropdown--is-loading');
      await this.generate();

      this.solveTimeout = setTimeout(() => {
        this.dropdownLoad();
      }, this.options.solveIn);

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

      this.dropdown.onclick = (event) => {
        event.stopPropagation();
      }

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
          <div class="exm-captcha__dropdown__footer__item">
            <button class="exm-captcha__dropdown__footer__item__button" type="button">
              Reload (${this.options.solveIn / 1000}s)
            </button>
          </div>
          <div class="exm-captcha__dropdown__footer__item">
          ${
            this.tryAgain
              ? `
              <div class="exm-captcha__dropdown__footer__item__error">
                Try again
              </div>
              `
              : `
              <a
                class="exm-captcha__dropdown__footer__item__link"
                href="https://github.com/exom-dev"
                target="_blanc"
              >
                The Exom Developers
              </a>
              `
          }
          </div>
          <div class="exm-captcha__dropdown__footer__item">
            <button class="exm-captcha__dropdown__footer__item__button" type="button">Skip</button>
          </div>
        </div>
      `;

      const footer = this.dropdown.children[2];
      const reload = footer.children[0].children[0];

      let reloadTimeLeft = this.options.solveIn;
      const reloadInterval = setInterval(() => {
        if (reloadTimeLeft <= 0) {
          return clearInterval(reloadInterval);
        }
    
        reloadTimeLeft -= 1000;
        reload.innerHTML = `Reload (${reloadTimeLeft / 1000}s)`;
      }, 1000);

      reload.onclick = () => {
        clearInterval(reloadInterval);
        this.dropdownLoad();
      }
      
      const submit = footer.children[2].children[0];
      const selected = {};

      submit.onclick = async () => {
        const answer = Object.keys(selected);
        
        if (answer.length === 0) {
          return this.dropdownLoad();
        }

        const response = await this.request(`/${this.captcha.id}/solve`, { answer });

        if (response === false) {
          this.tryAgain = true;
          return this.dropdownLoad();
        } else {
          setTimeout(() => {
            this.checkbox.checked = false;
          }, this.options.expires);

          this.checkbox.checked = true;
          return this.dropdownClose();
        }
      }

      for (let index = 0; index < this.dropdown.children[1].children.length; index++) {
        const image = this.dropdown.children[1].children[index];
        image.onclick = (event) => {
          const data = this.captcha.data[index];

          if (selected.hasOwnProperty(data) === false) {
            selected[data] = true;
          } else {
            delete selected[data];
          }

          if (Object.keys(selected).length === 0) {
            submit.classList.remove('exm-captcha__dropdown__footer__item__button--blue');
            submit.innerHTML = 'Skip';
          } else {
            submit.classList.add('exm-captcha__dropdown__footer__item__button--blue');
            submit.innerHTML = 'Next';
          }

          event.target.classList.toggle('exm-captcha__dropdown__data__image--is-selected');
        }
      }
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
