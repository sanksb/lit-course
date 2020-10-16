/* eslint-disable prefer-const */
import { LitElement, html } from 'lit-element';
import { item002ListaCipaStyles } from '../../archivos_comunes/ac_informe-cipa/styles';
import { CONSTANTS_ITEM002 } from '../../archivos_comunes/ac_informe-cipa/constantes';
import { svgBeniX, svgBeniOrdenarString, svgBeniOrdenarOther, svgBeniOrdenarInt, svgBeniCircleRed, svgBeniCircleYellow } from '../../archivos_comunes/ac_informe-cipa/svc_icons';
import { cargarInformacionCandidatosCipa } from '../../archivos_comunes/ac_informe-cipa/mocks';

export class BeniListaCipa extends LitElement {
  constructor() {
    super();
    this.datosCipa = cargarInformacionCandidatosCipa();
    this.tituloFormulario = 'Lista de candidatos con información pendiente a actualizar';
  }

  static get properties() {
    return {
      datosCipa: { type: Object },
      tituloFormulario: { type: String }
    };
  }

  static get styles() {
    return [
      item002ListaCipaStyles
    ];
  }

  render() {
    return html`
      <div class="div_slot_top">
        <slot name="top">
        </slot>
      </div>

      <div class="div_slot_defaul">
        <slot>
        </slot> 
      </div>

      <div id="${CONSTANTS_ITEM002.divBodyAbrirCipa}" class="div_body_abrir_cipa">
        <div class="div_button_abrir_cipa">
          <button @click="${this.hiddenBodyAbrirCipa}" class="button_abrir_cipa" >Abrir lista de candidatos con información pendiente a actualizar </button>
        </div>
      </div>

      <div id="${CONSTANTS_ITEM002.divBodyCipa}"  class="div_body_cipa">
        <div class="div_header_cipa">
          <div class="div_titulo_cipa">
            <!-- EL TITULO FORMULARIO SE PUEDE MODIFICAR SEGUN SE DESEE -->
            <label class="titulo_header_cipa">${this.tituloFormulario}</label>
          </div>
          <div class="div_header_controles_cipa">
            <div @click="${this.hiddenBodyCipa}" class="div_x_header_cipa">
              ${svgBeniX}
            </div>
          </div>
        </div>
        <div class="div_main_cipa">

          <table id="${CONSTANTS_ITEM002.table_id}" class="tabla_cipa">

            <!--  HEADER TABLA -->
            <tr>
              <th scope="row">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Nombre</label>
                  </div>
                  <div @click=${() => this.ordenarTablaCipaString(0, 'str')} class="campo_ordenar">
                    ${svgBeniOrdenarString}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarNombreId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="row">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Correo electronico</label>
                  </div>
                  <div @click=${() => this.ordenarTablaCipaString(1, 'str')} class="campo_ordenar">
                    ${svgBeniOrdenarString}
                      <div class="div_texto_campo_ordenar">                    
                        <label id="${CONSTANTS_ITEM002.labelOrdenarCorreoId}" class="texto_campo_ordenar"></label>
                      </div>
                  </div>
                </div>
              </th>
              <th scope="row">
                <label>Telefono</label>
              </th>
              <th scope="row">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Perfil</label>
                  </div>
                  <div @click=${() => this.ordenarTablaCipaString(3, 'str')} class="campo_ordenar">
                    ${svgBeniOrdenarString}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarPerfilId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="row">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>En plantilla</label>
                  </div>
                  <div @click=${() => this.ordenarTablaCipaString(4, 'str')} class="campo_ordenar">
                    ${svgBeniOrdenarOther}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarPlantillaId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="row">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Fecha de ultima actualizacion de datos</label>
                  </div>
                  <div @click=${() => this.ordenarTablaCipaFecha(5, 'fecha')} class="campo_ordenar">
                    ${svgBeniOrdenarInt}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarFuaId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="row">
                <div class="div_flex_th_cipa">
                  <div>
                    <label>Fecha de vencimiento</label>
                  </div>
                  <div @click=${() => this.ordenarTablaCipaFecha(6, 'fecha')} class="campo_ordenar">
                    ${svgBeniOrdenarInt}
                    <div class="div_texto_campo_ordenar">                    
                      <label id="${CONSTANTS_ITEM002.labelOrdenarFvId}" class="texto_campo_ordenar"></label>
                    </div>
                  </div>
                </div>
              </th>
              <th scope="row">Semaforo</th>
            </tr>

            <!--  MAIN TABLA -->
            ${Object.keys(this.datosCipa).map(item => html`
            <tr>
              <td>
                <label class="label_nombre_candidato_cipa" @click=${() => this.dirigirUrlEditarCandidato(this.datosCipa[item].nombre)}>
                  ${this.cambiarFormatoNombre(this.datosCipa[item].nombre)}
                </label>
              </td>
              <td>
                <label>
                  ${this.cambiarFormatoCorreo(this.datosCipa[item].email)}
                </label>
              </td>
              <td>
                <label>
                  ${this.datosCipa[item].telefono}
                </label>
              </td>
              <td>
                <label>
                  ${this.cambiarFormatoPerfil(this.datosCipa[item].perfil)}
                </label>
              </td>
              <td>
                <div class="checkbox">
                  ${this.datosCipa[item].en_plantilla
    ? html`<input checked disabled id="checkbox1_${item}" type="checkbox" value="1" />
                    <label for="checkbox1_${item}"></label>`
    : html`<input disabled id="checkbox1_${item}" type="checkbox" value="1" />
                    <label for="checkbox1_${item}"></label>
                  `}
                </div>
              </td>
              <td>
                <label>
                  ${this.datosCipa[item].fecha_ultima_actualizacion}
                </label>
              </td>
              <td>
                <label>
                  ${this.calcularFechaVencimiento(this.datosCipa[item].fecha_ultima_actualizacion)}
                </label>
              </td>
              <td>
                <div class="div_semaforo">
        ${this.calcularDiferenciaFechaSemaforo(this.calcularFechaVencimiento(this.datosCipa[item].fecha_ultima_actualizacion)) === 'rojo'
    ? html`${svgBeniCircleRed}`
    : html` ${this.calcularDiferenciaFechaSemaforo(this.calcularFechaVencimiento(this.datosCipa[item].fecha_ultima_actualizacion)) === 'amarillo'
      ? html`${svgBeniCircleYellow}`
      : html``}
        `}
                </div>
              </td>
            </tr>
            `)}
          </table>

        </div>
      </div>

      <div class="div_slot_bottom">
        <slot name="bottom">
        </slot>
      </div>
    `;
  }

  hiddenBodyCipa() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.divBodyCipa).style.display = 'none';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.divBodyAbrirCipa).style.display = 'block';
  }

  hiddenBodyAbrirCipa() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.divBodyCipa).style.display = 'block';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.divBodyAbrirCipa).style.display = 'none';
  }

  dirigirUrlEditarCandidato(idCandidatoEditar) {
    /* CUANDO SE INTRODUCA EN PRODUCCION EDITAR ESTA FUNCION PARA QUE REDIRIGA A EDITAR PERFIL DEL CANDIDATO CON ESTE NOMBRE O PASAR OTRO PARAMETRO DESDE LA BASE DE DATOS CON SU RESPECTIVO ID: EXTRAERLO DE LA FUNCION QUE CARGA POR DEFECTO EL CONSTRUCTOR RESULTADOS BASE DATOS JSON */
    // eslint-disable-next-line no-console
    console.log('URL: REDIRIGIR URL - EDITAR CANDIDATO [ ' + idCandidatoEditar + ' ]');
  }

  /* CAMBIAR FORMATO PERFIL */
  cambiarFormatoPerfil(perfil) {
    let resultado = perfil[0].toUpperCase() + perfil.slice(1);
    return resultado;
  }

  /* CAMBIAR FORMATO EMAIL - TODO MINUSCULAS */
  cambiarFormatoCorreo(email) {
    let resultado = email.toLowerCase();
    return resultado;
  }

  /* CAMBIAR FORMATO NOMBRE RECIBIDO - 1 MAYUSCULA - RESTO MINUSCULA */
  cambiarFormatoNombre(nombre) {
    let dato = nombre.toLowerCase();
    let arrayDatos = dato.split(' ');
    let resultado = '';

    for (let i = 0; i < arrayDatos.length; i++) {
      if (i === arrayDatos.length - 1) {
        resultado += arrayDatos[i][0].toUpperCase() + arrayDatos[i].slice(1);
      } else {
        resultado += arrayDatos[i][0].toUpperCase() + arrayDatos[i].slice(1) + ' ';
      }
    }
    return resultado;
  }

  ordenarTablaCipaFecha(n, type) {
    this.vaciarCamposOrdena();
    let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let switchcount = 0;
    table = this.shadowRoot.getElementById(CONSTANTS_ITEM002.table_id);
    switching = true;
    dir = 'asc';

    if (n === 5) {
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFuaId).innerHTML = 'ASC';
    }
    if (n === 6) {
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFvId).innerHTML = 'ASC';
    }

    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];

        let xNew = x.getElementsByTagName('label')[0].innerHTML.replace(/ /g, '');
        let arrayDatosFechaX = xNew.split('/');
        let dateX = new Date(arrayDatosFechaX[2], (parseInt(arrayDatosFechaX[1]) + parseInt('1')), arrayDatosFechaX[0]);

        let yNew = y.getElementsByTagName('label')[0].innerHTML.replace(/ /g, '');
        let arrayDatosFechaY = yNew.split('/');
        let dateY = new Date(arrayDatosFechaY[2], (parseInt(arrayDatosFechaY[1]) + parseInt('1')), arrayDatosFechaY[0]);
        xNew = dateX.getTime();
        yNew = dateY.getTime();

        if (dir === 'asc') {
          if (type === 'fecha' && parseFloat(xNew) > parseFloat(yNew)) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if (type === 'fecha' && parseFloat(xNew) < parseFloat(yNew)) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === 'asc') {
          if (n === 5) {
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFuaId).innerHTML = 'DES';
          }
          if (n === 6) {
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFvId).innerHTML = 'DES';
          }
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  ordenarTablaCipaString(n, type) {
    this.vaciarCamposOrdena();
    let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let switchcount = 0;
    table = this.shadowRoot.getElementById(CONSTANTS_ITEM002.table_id);
    switching = true;
    dir = 'asc';

    if (n === 0) {
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarNombreId).innerHTML = 'ASC';
    }
    if (n === 1) {
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarCorreoId).innerHTML = 'ASC';
    }
    if (n === 3) {
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPerfilId).innerHTML = 'ASC';
    }
    if (n === 4) {
      this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPlantillaId).innerHTML = 'SI';
    }

    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('TD')[n];
        y = rows[i + 1].getElementsByTagName('TD')[n];

        if (dir === 'asc') {
          if ((type === 'str' && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) || (type === 'int' && parseFloat(x.innerHTML) > parseFloat(y.innerHTML))) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
          if ((type === 'str' && x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) || (type === 'int' && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === 'asc') {
          if (n === 0) {
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarNombreId).innerHTML = 'DES';
          }
          if (n === 1) {
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarCorreoId).innerHTML = 'DES';
          }
          if (n === 3) {
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPerfilId).innerHTML = 'DES';
          }
          if (n === 4) {
            this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPlantillaId).innerHTML = 'NO';
          }
          dir = 'desc';
          switching = true;
        }
      }
    }
  }

  vaciarCamposOrdena() {
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarNombreId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarCorreoId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPerfilId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarPlantillaId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFuaId).innerHTML = '';
    this.shadowRoot.getElementById(CONSTANTS_ITEM002.labelOrdenarFvId).innerHTML = '';
  }

  calcularDiferenciaFechaSemaforo(fechaVencimiento) {
    let date = new Date();

    /* DIAS QUE HAY EN ESOS 3 MESES FECHA ACTUAL - VENCIMIENTO */
    let arrayDatosFecha = fechaVencimiento.split('/');
    let fechaVenciminetoFormato = new Date(arrayDatosFecha[2], (parseInt(arrayDatosFecha[1]) - parseInt('1')), arrayDatosFecha[0]);
    let fechaVencimiento3Meses = new Date(arrayDatosFecha[2], (parseInt(arrayDatosFecha[1]) - parseInt('1')), arrayDatosFecha[0]);
    fechaVencimiento3Meses.setMonth(fechaVenciminetoFormato.getMonth() - 3);
    let diff3Milis = fechaVenciminetoFormato.getTime() - fechaVencimiento3Meses.getTime();
    let diasDif3Meses = (Math.floor(diff3Milis / (1000 * 60 * 60 * 24)));

    /* FECHA VENCIMIENTO  FECHA ACTUAL - FECHA VENCIMIENTO | DIAS QUE TIENE 1 MES */
    let fechaVencimiento1Meses = new Date(arrayDatosFecha[2], (parseInt(arrayDatosFecha[1]) - parseInt('1')), arrayDatosFecha[0]);
    fechaVencimiento1Meses.setMonth(fechaVenciminetoFormato.getMonth() - 1);
    let diff1Milis = fechaVenciminetoFormato.getTime() - fechaVencimiento1Meses.getTime();
    let diasDif1Meses = (Math.floor(diff1Milis / (1000 * 60 * 60 * 24)));

    // DIAS QUE HAY ENTRE LA fechaVencimiento Y LA FECHA_ACTUAL
    var fechaInicio = new Date(fechaVenciminetoFormato).getTime();
    var fechaFin = new Date(date).getTime();
    var diff = fechaInicio - fechaFin;
    let diferenciaFechasActualVencimiento = (Math.floor(diff / (1000 * 60 * 60 * 24)));

    let valorFinalEnviar = null;
    if (parseInt(diferenciaFechasActualVencimiento) <= parseInt(diasDif3Meses) && parseInt(diferenciaFechasActualVencimiento) >= diasDif1Meses) {
      valorFinalEnviar = 'amarillo';
    }

    if (diferenciaFechasActualVencimiento <= diasDif1Meses) {
      valorFinalEnviar = 'rojo';
    }

    return valorFinalEnviar;
  }

  calcularFechaVencimiento(fechaUltimaActualizacion) {
    let arrayDatosFecha = fechaUltimaActualizacion.split('/');
    let date = new Date(arrayDatosFecha[2], (parseInt(arrayDatosFecha[1]) + parseInt('1')), arrayDatosFecha[0]);
    date.setMonth(date.getMonth() + 18);
    let fechaFinal = '';

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    fechaFinal = (`${day}/${month}/${year}`);
    if (month < 10) {
      fechaFinal = (`${day}/0${month}/${year}`);
      if (day < 10) {
        fechaFinal = (`0${day}/0${month}/${year}`);
      }
    }
    if (day < 10) {
      fechaFinal = (`0${day}/${month}/${year}`);
      if (month < 10) {
        fechaFinal = (`0${day}/0${month}/${year}`);
      }
    }
    return fechaFinal;
  }
}

customElements.define('informe-cipa', BeniListaCipa);
