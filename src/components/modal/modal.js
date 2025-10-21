import { LitElement, html } from "lit-element";
import { modalStyles } from "./modal-styles";

export class ModalComponent extends LitElement {
  static properties = {
    visible: { type: Boolean, reflect: true },
    title: { type: String },
    message: { type: String },
    type: { type: String }, // success | error | confirm
  };

  static styles = [modalStyles];

  constructor() {
    super();
    this.visible = false;
    this.title = "";
    this.message = "";
    this.type = "success";
  }

  /**
   * Muestra el modal con configuración personalizada
   * @param {Object} options - opciones del modal
   * @param {string} options.title - título del modal
   * @param {string} options.message - mensaje del modal
   * @param {string} options.type - tipo de modal ('success', 'error', 'confirm')
   * @returns {Promise<boolean>} - true si se confirma, false si se cancela
   */

  show({
    title = "",
    message = "",
    type = "success",
    autoClose = false,
    duration = 5000,
  }) {
    this.title = title;
    this.message = message;
    this.type = type;
    this.visible = true;

    return new Promise((resolve) => {
      this._resolve = resolve;
      if (autoClose) {
        setTimeout(() => this.close(true), duration);
      }
    });
  }

  /** Cierra el modal y devuelve el resultado */
  close(result = false) {
    this.visible = false;
    if (this._resolve) this._resolve(result);
  }

  render() {
    return html`
      <div class="modal">
        <h3>${this.title}</h3>
        <p>${this.message}</p>
        <div class="buttons">
          ${this.type === "confirm"
            ? html`
                <button class="cancel" @click=${() => this.close(false)}>
                  Cancelar
                </button>
                <button class="confirm" @click=${() => this.close(true)}>
                  Aceptar
                </button>
              `
            : html`
                <button class="ok" @click=${() => this.close(true)}>
                  Aceptar
                </button>
              `}
        </div>
      </div>
    `;
  }
}

customElements.define("modal-component", ModalComponent);
