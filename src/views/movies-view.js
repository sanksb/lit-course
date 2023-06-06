import { LitElement, html, css } from 'lit-element';
import '../components/movies/movies-custom';
import '../components/form-validation';
import '../components/common-header';

class MoviesView extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  static get properties() {
    return {};
  }

  render() {
    return html` <movies-custom></movies-custom> `;
  }
}

customElements.define('movies-view', MoviesView);
