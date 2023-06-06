import { LitElement, html, css } from 'lit-element';
import './modal-movie';
export class ListMovies extends LitElement {
  static get styles() {
    return [
      css`
        .card {
          /*CARAC*/
          display: flex;
          align-content: center;
          flex-direction: column;
          width: 300px;
          height: 300px;
          align-items: center;

          /*FONDO*/
          border-radius: 8px;
          box-shadow: 0 2px 2px rgba(1, 46, 83, 0.908);
          margin: 10px;
          transition: all 0.5s;
          background-color: #015153;
          z-index: 3;
        }
        .contenedor .card:hover {
          transform: translateY(-15px);
          box-shadow: 0 50px 50px rgb(4, 107, 167);
          opacity: 0.7;
        }
        #imagen:hover {
          z-index: -10;
        }
        .img {
          display: flex;
          flex-direction: column;
          align-items: center;
          align-content: center;
          max-width: 100%;
          max-height: 100%;
          min-height: 100%;
          z-index: inherit;
        }
        .mainContainer {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: stretch;
          padding: 50px;
        }

        #label {
          text-align: center;
          z-index: -1;
          position: relative;
          color: yellow;
          margin-top: 150px;
          font-size: 25px;
          font-weight: bold;
        }
        #imagen {
          z-index: inherit;
          position: absolute;
        }
        #imageModal {
          width: 30%;
          height: 100%;
        }
      `,
    ];
  }

  static get properties() {
    return {
      list: { type: Array },
      showMore: { type: Boolean },
      item: { type: Object },
    };
  }

  constructor() {
    super();
    this.list = [];
    this.showMore = true;
    this.item = {};
  }

  sendData(item) {
    this.item = item;
    const videpModal = this.shadowRoot.querySelector('modal-movie');
    videpModal.openModal();
  }

  render() {
    return html`
        <div class="mainContainer">
            ${this.list.map(
              (item, i) => html`
                  <div class="contenedor" >
                    <div class="card" @click="${() => this.sendData(item)}>
                      <div class="img">
                        <img id="imagen" src='${
                          item.Poster !== 'N/A'
                            ? item.Poster
                            : 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest-332x332.png'
                        }' height="300px" width="300"></>
                        <label id="label">${item.Title}</label>
                      </div>
                      
                    </div>
                  </div>
              `,
            )}
        </div>
        <modal-movie>
              <img id="imageModal" slot="image" src="${this.item.Poster}"></>  
              <label slot="title">${this.item ? this.item.Title : ''}</label>
              <label slot="year">${this.item ? this.item.Year : ''}</label>
              <a href="https://www.google.es/search?q=${this.item.Title}" slot="redirect" target="_blank">Go to</a>
        </modal-movie>     
        `;
  }
}
customElements.define('list-movies', ListMovies);
