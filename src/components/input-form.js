/* eslint-disable no-alert */
import { LitElement, html, css } from 'lit-element';

class InputFrom extends LitElement {
  static get styles() {
    return [
      css`
        .input-text {
          padding: 10px;
          border: 1px solid #b6c3c4;
        }

        .btn-submit {
          height: 37px;
          background-color: transparent;
          border: 1px solid grey;
          padding: 10px;
          outline: none;
          cursor: pointer;
        }

        .btn-submit:hover {
          background-color: #f1f1f1;
        }
      `,
    ];
  }

  sendData(e) {
    const input = this.shadowRoot.querySelector('#message');
    const carList = this.shadowRoot.querySelector('#cars');
    const color = this.shadowRoot.querySelector('#color_favorito');

    if (input.value && this.cardListValidator(carList.options[carList.selectedIndex].value)) {
      const event = new CustomEvent('my-event', {
        detail: {
          message: input.value,
          date: new Date(),
          car: carList.options[carList.selectedIndex].value,
          color: color.value,
        },
      });

      this.dispatchEvent(event);
      input.value = '';
    } else {
      alert('Empty field');
    }

    e.preventDefault();
  }

  cardListValidator(item) {
    return item !== 'default';
  }

  render() {
    return html`
      <form @submit="${this.sendData}">
        <input id="message" type="text" class="input-text" placeholder="write here.." />
        <label>Choose a car: </label>
        <select name="cars" id="cars">
          <option value="default"></option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <label>Select your favorite colour: </label>
        <input type="color" id="color_favorito" />
        <button type="submit" @click="${this.sendData}" class="btn-submit"><slot></slot></button>
      </form>
    `;
  }
}

window.customElements.define('input-form', InputFrom);
