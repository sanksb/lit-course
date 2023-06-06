import { LitElement, html } from 'lit-element';

export class RadioChecks extends LitElement {
  constructor() {
    super();
    this.list = [];
  }

  static get properties() {
    return {
      list: { type: Array },
    };
  }

  itemSelected(i) {
    const event = new CustomEvent('selected-item', {
      detail: {
        index: i,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      ${this.list.map(
        (item, i) =>
          html`
            <label>${item.valor}</label>
            <input type="radio" id="${item.nombre}" value="${item.valor}" @click="${() => this.itemSelected(i)}" />
          `,
      )}
    `;
  }
}
window.customElements.define('radio-checks', RadioChecks);
