import { LitElement, html } from 'lit-element';
import { dateFormatter } from '../utils/functions';

class ListComponent extends LitElement {
  static get properties() {
    return {
      list: { type: Array },
    };
  }

  constructor() {
    super();
    this.list = [];
  }

  deleteItem(i) {
    const event = new CustomEvent('delete-event', {
      detail: {
        index: i,
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    return html`
      <ul>
        ${this.list.map(
          (item, i) =>
            html`
              <li>
                <div id="contenedor-linea">
                  ${dateFormatter(item.date).hour} ${item.message}
                  <span style="color: ${item.color}">${item.car}</span>
                  <button @click="${() => this.deleteItem(i)}">&times;</button>
                </div>
              </li>
            `,
        )}
      </ul>
    `;
  }
}

window.customElements.define('list-component', ListComponent);
