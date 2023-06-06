import { LitElement, html, css } from 'lit-element';
import { commonStyles } from '../../utils/custom-styles';
import { styles } from '../../utils/home-styles';
import '../navigation/navigation-wc.js';
import '../common-header';
import './input-movies';
import './list-movies';
import './modal-movie';

const url = 'https://www.omdbapi.com/?apikey=e477ed6a&s=';
const errorHandler = (response) => {
  if (!response.ok) {
    return { error: response.statusText, errorCode: response.status };
  }
  return response.json();
};

export class MoviesCustom extends LitElement {
  static get styles() {
    return [
      css`
        .input-text {
          padding: 10px;
          border: 1px solid #b6c3c4;
        }
        #main {
          z-index: 100;
        }
      `,
      styles,
      commonStyles,
    ];
  }

  static get properties() {
    return {
      list: { type: Array },
      page: { type: Number },
      search: { type: String },
      showSpinner: { type: Boolean },
      nbHits: { type: Number },
      hitsPerPage: { type: Number },
      year: { type: Number },
      type: { type: String },
      list_page: { type: Array },
      n_page: { type: Number },
    };
  }

  constructor() {
    super();
    this.list = [];
    this.page = 0;
    this.search = '';
    this.showSpinner = false;
    this.nbHits = 0;
    this.hitsPerPage = 20;
    this.year = 0;
    this.type = '';
    this.list_page = [];
    this.n_page = 1;
  }

  async firstUpdated() {
    this.searchMovies({ detail: { title: 'matrix', type: 'movie' } });
  }

  async searchMovies(e) {
    if (e.detail) {
      this.search = e.detail.title;
      this.year = e.detail.year;
      this.type = e.detail.type;
      this.page = 0;
      this.n_page = e.detail.n_page;

      this.setLoader(true, 'reset');
    } else {
      this.page = this.page + 1;
      this.setLoader(true);
    }

    const data = await this.getDataFromApi();
    this.nbHits = data.Search;

    if (!data.error) {
      this.list_page = [];

      while (this.page < Number(data.totalResults) / 10) {
        this.list_page.push(this.page + 1);
        this.page++;
      }
      this.page = 0;

      this.list = !e.detail ? [...this.list, ...data.Search] : [...data.Search];
    }
    this.setLoader(false);
  }

  setLoader(state, reset = null) {
    const listComponent = this.shadowRoot.querySelector('list-movies');
    listComponent.style.display = reset ? 'none' : 'block';

    this.showSpinner = state;
    listComponent.showMore = !state;
  }

  async getDataFromApi() {
    if (this.year === 0) {
      this.year = undefined;
    }
    if (this.type.localeCompare('empty') === 0) {
      this.type = 'movie';
    }

    return fetch(`${url}${this.search}&y=${this.year}&type=${this.type}&page=${this.n_page}`, { method: 'GET' })
      .then(errorHandler)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return { error };
      });
  }

  render() {
    return html`
      <common-header></common-header>
      <navigation-wc></navigation-wc>

      <input-movies @my-event="${this.searchMovies}" .list_page="${this.list_page}"></input-movies>
      <list-movies .list="${this.list}"></list-movies>
    `;
  }
}
customElements.define('movies-custom', MoviesCustom);
