import { LitElement, html, css } from 'lit-element';
import './list-page';

export class InputMovies extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          padding-top: 2%;
          display: flex;
          justify-content: center;
        }
        #input-container {
          display: flex;
          flex-wrap: wrap;
        }
        @media (max-width: 771px) {
          #input-container {
            display: flex;
            flex-direction: column;
          }
        }
      `,
    ];
  }

  static get properties() {
    return {
      list_page: { type: Array },
      page: { type: Number },
    };
  }

  constructor() {
    super();
    this.list_page = [];
    this.page = 1;
  }

  sendData(e) {
    const inputYear = this.shadowRoot.querySelector('#input-year');
    const videoList = this.shadowRoot.querySelector('#video-type');
    const inputTittle = this.shadowRoot.querySelector('#input-tittle');

    if (inputTittle.value) {
      const event = new CustomEvent('my-event', {
        detail: {
          title: inputTittle.value,
          date: new Date(),
          type: videoList.options[videoList.selectedIndex].value,
          year: Number(inputYear.value) ? Number(inputYear.value) : undefined,
          n_page: this.page,
        },
      });
      this.dispatchEvent(event);
    }
    e.preventDefault();
  }

  gotPageNumber(e) {
    this.page = e.detail.page;
  }

  render() {
    return html`
            <div id="input-container">
              <label for="input-tittle">Title: </label>
              <input type="text" id="input-tittle"></input>
              <label for="input-year">Year: </label>
              <input id="input-year" type="text"></input>
              <label for="video-type">Type: </label>
              <select name="type-video" id="video-type">
                  <option value="empty"></option>
                  <option value="movie">Movies</option>
                  <option value="series">Series</option>
                  <option value="episode">Episodes</option>
              </select>
              <list-page @my-event-list="${this.gotPageNumber}" .list_size="${this.list_page}"></list-page>
              <button @click="${this.sendData}">Search</button>
            </div>
        `;
  }
}
customElements.define('input-movies', InputMovies);
