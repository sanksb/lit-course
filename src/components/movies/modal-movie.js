import { LitElement, html, css } from 'lit-element';

export class ModalMovie extends LitElement {
  static get styles() {
    return [
      css`
          * {
            font-family: Sans-Serif;
            box-sizing: border-box;
            }

        html {
            --transition-time: .2s;
            --modal-backdrop: rgba(0, 0, 0, 0.5);
        }
 
        .modal {
        position: fixed;
        z-index: 999;
        background-color: var(--modal-backdrop);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding: 20px;
    
        display: flex;
        justify-content: center;
        align-items: center;
        
        visibility: hidden;
        opacity: 0;
        transition:
            visibility var(--transition-time),
            opacity var(--transition-time);
        }

        .content {
        width: 100%;
        height: auto;
        
        background-color: white;
        text-align: center;
        padding: 40px;
        font-size: 20px;
        overflow: hidden;
        
        margin-top: -50px;
        transition: margin-top 0.5s;
        }
        .contenedor {
            display: flex;
            flex-direction: column;
        }

        .open {
        visibility: visible;
        opacity: 1;
        }
        #hostInfoMovie{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center
        }
        .info {
            display: flex;
            flex-direction: column; 
            padding: 20px;
        }
        
        
        .open > .content {
        margin: 0px;
        }
        
        .text {
        margin-bottom: 20px;
        }
        #img_container{
            justify-content: center
            align-items:center
            height: 50%;
            width: 100%;
        }
        
        @media (min-width: 800px) {
        .content {
            width: 50%;
        }}
            `,
    ];
  }

  static get properties() {
    return {
      modal: { type: Object },
    };
  }

  constructor() {
    super();
    this.modal = null;
  }

  closeModal() {
    this.modal = this.shadowRoot.querySelector('.modal');
    this.modal.classList.remove('open');
  }

  openModal() {
    this.modal = this.shadowRoot.querySelector('.modal');
    this.modal.classList.add('open');
  }

  render() {
    return html`
      <div>
        <div class="modal">
          <div class="content">
            <div class="contenedor">
              <div id="img_container">
                <slot name="image"></slot>
              </div>
              <div id="hostInfoMovie">
                <div class="info">
                  <label>Titulo: </label>
                  <slot name="title"></slot>
                </div>
                <div class="info">
                  <label>Year: </label>
                  <slot name="year"></slot>
                </div>
                <div class="info">
                  <label>Redirect: </label>
                  <slot name="redirect"></slot>
                </div>
              </div>
              <div>
                <button @click="${this.closeModal}">Accept</button>
                <button @click="${this.closeModal}">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <button @click="${this.openModal}">Open modal</button>
      </div>
    `;
  }
}
customElements.define('modal-movie', ModalMovie);
