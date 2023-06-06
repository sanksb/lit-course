/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';
import { nothing } from 'lit-html';
import { emailValidator } from '../utils/functions';
import { seedStyle } from '@seed-catalog/styles';
import '../components/common-header';
// import './radio-checks';
import '../components/radio-checks';

class FormValidation extends LitElement {
  static get styles() {
    return [
      seedStyle,
      css`
        :host {
          width: fit-content;
        }

        .form-field {
          padding: 10px;
          border-radius: 0;
          border: 1px solid grey;
          margin: 3px;
        }
        .form-wrong {
          padding: 10px;
          border-radius: 0;
          border: 3px solid red;
          margin: 3px;
        }

        .alert-succesfull {
          display: inline-block;
          color: white;
          padding: 0;
          background-color: transparent;
          margin-left: 10px;
        }

        .alert-msg {
          color: black;
          padding: 10px;
        }

        .negrita {
          font-weight: bold;
        }
        .cursiva {
          font-style: italic;
        }
        .subrallada {
          text-decoration: underline black;
        }

        @media (min-width: 768px) {
          form {
            flex-flow: row wrap;
            justify-content: center;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      validated: { type: Boolean, attribute: false },
      message: { type: String, attribute: false },
      radioList: { type: Array },
      styleRadio: { type: String },
    };
  }

  constructor() {
    super();
    this.validated = false;
    this.message = '';
    this.styleRadio = '';
    this.radioList = [
      { nombre: 'Negrita', valor: 'negrita' },
      { nombre: 'Cursiva', valor: 'cursiva' },
      { nombre: 'Subrayada', valor: 'subrayada' },
    ];
  }

  passwordValidator(pw) {
    return pw !== '' && pw.length === 8;
  }

  cardListValidator(item) {
    return item !== 'default';
  }

  onSubmit(e) {
    const email = this.shadowRoot.querySelector('#email');
    const password = this.shadowRoot.querySelector('#password');
    const carList = this.shadowRoot.querySelector('#cars');

    if (!emailValidator(email.value)) {
      this.message = 'Enter a valid email';
      return false;
    }

    if (!this.passwordValidator(password.value)) {
      this.message = 'Your password must contain 8 characters';
      return false;
    }

    if (!this.cardListValidator(carList.options[carList.selectedIndex].value)) {
      this.message = 'Select a item car';
      return false;
    }

    this.validated = true;
    this.message = '';
  }

  selectedRadio(e) {
    if (e.detail.index === 0) {
      this.styleRadio = 'negrita';
    } else if (e.detail.index === 1) {
      this.styleRadio = 'cursiva';
    } else {
      this.styleRadio = 'subrallada';
    }
  }

  render() {
    return html`
      <form onsubmit="return false">
        <input
          id="email"
          type="text"
          class=${!this.message.includes('email') ? 'form-field' : 'form-wrong'}
          placeholder="email"
        />
        <input
          id="password"
          type="password"
          class=${!this.message.includes('password') ? 'form-field' : 'form-wrong'}
          placeholder="password"
        />
        <input type="submit" @click="${this.onSubmit}" class="sd-btn black" value="Check" />
        <label>Choose type: </label>
        <select name="cars" id="cars">
          <option value="default"></option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>

        <radio-checks .list="${this.radioList}" @selected-item="${this.selectedRadio}"></radio-checks>
        <p class="${this.styleRadio}">
          asdbm,a a,ms da,sm dnas,m da,s dna,msd nas, da as, dna,smd na alksd jaslkd as dasd kñlasj dasdlasj
        </p>
        ${this.validated && this.message === '' ? html`<div class="alert-succesfull">&#128077;</div>` : nothing}
      </form>
      ${this.message !== '' ? html`<div class="alert-msg">${this.message}</div>` : nothing}
    `;
  }
}

window.customElements.define('form-validation', FormValidation);
