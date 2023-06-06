import { LitElement, html } from 'lit-element';

export class ListPage extends LitElement {
  static get properties() {
    return {
      propName: { type: String },
      list_size: { type: Array },
    };
  }

  constructor() {
    super();
    this.list_size = [];
  }

  sendPageNumber(e) {
    const listPages = this.shadowRoot.querySelector('#list_page');
    const event = new CustomEvent('my-event-list', {
      detail: {
        page: listPages.options[listPages.selectedIndex].value,
      },
    });
    this.dispatchEvent(event);
  }

  selectFirst() {
    if (this.list_size.length > 0) {
      const selectOoptions = this.shadowRoot.querySelector('#list_page');
      selectOoptions.value = this.list_size[0];
    }
  }

  render() {
    return html`
      <label for="list_page">Page: </label>
      <select name="list_page" id="list_page" @click="${this.sendPageNumber}">
        ${this.list_size.map((item) => html` <option value="${item}">${item}</option> `)}
      </select>
      ${this.selectFirst()}
    `;
  }
}
customElements.define('list-page', ListPage);
