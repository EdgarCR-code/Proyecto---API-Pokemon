import { LitElement, html, css } from "lit-element";
import styles from "./form-styles.js"

export class FormComponent extends LitElement {
  static styles = [styles];
  static properties = {
    nombre: { type: String },
    tipos: { type: Array },
    peso: { type: Number },
    altura: { type: Number },
    tiposDisponibles: { type: Array },
  };

  constructor() {
    super();
    this.id = 1;
    this.nombre = "";
    this.tipos = [];
    this.peso = "";
    this.altura = "";
    this.tiposDisponibles = [
      "Agua", "Fuego", "Planta", "Eléctrico", "Roca", "Tierra", "Normal",
      "Lucha", "Siniestro", "Acero", "Psíquico", "Fantasma", "Bicho",
      "Veneno", "Volador", "Hada", "Hielo", "Dragón"
    ];
  }

  //Guardar Pokémon
  guardarPokemon() {
    if (!this.nombre || this.tipos.length === 0 || this.peso === "" || this.altura === "") {
      alert("Todos los campos son obligatorios.");
      return;
    }

    //Definir id
    const localData = JSON.parse(localStorage.getItem("pokemons")) || [];
    const maxLocalId = localData.length > 0 ? Math.max(...localData.map(p => p.id)) : 0;
    const maxApiId = 20; //Es el numero de pokemones que pedimos en el fetch a la api
    const nuevoId = Math.max(maxLocalId, maxApiId) + 1;

    const nuevo = {
      id: nuevoId,
      nombre: this.nombre,
      tipos: this.tipos.join(", "),
      peso: this.peso,
      altura: this.altura
    };

    
    localData.push(nuevo);
    localStorage.setItem("pokemons", JSON.stringify(localData));

    this.dispatchEvent(new CustomEvent('pokemon-agregado', { bubbles: true, composed: true }));

    alert("Pokémon agregado con éxito");
    this.limpiarFormulario();
    window.location.reload();
  }

  //Editar Pokémon existente
  cargarPokemon(pokemon) {
    this.nombre = pokemon.nombre;
    this.tipos = pokemon.tipos.split(", ").filter(Boolean);
    this.peso = pokemon.peso;
    this.altura = pokemon.altura;
  }

  limpiarFormulario() {
    this.nombre = "";
    this.tipos = [];
    this.peso = "";
    this.altura = "";
    this.requestUpdate();
  }

  //Manejo de checkboxes
  toggleTipo(e) {
    const tipo = e.target.value;
    if (e.target.checked) {
      this.tipos = [...this.tipos, tipo];
    } else {
      this.tipos = this.tipos.filter(t => t !== tipo);
    }
  }

  render() {
    return html`
      <h3>Agregar Pokémon</h3>
      <form @submit=${e => e.preventDefault()}>
        <label>Nombre:</label>
        <input placeholder="Ej. Pikachu" .value=${this.nombre} @input=${e => this.nombre = e.target.value}>

        <label>Tipo(s):</label>
        <div class="tipos-container">
          ${this.tiposDisponibles.map(tipo => html`
            <label class="tipo-item">
              <input
                type="checkbox"
                value=${tipo}
                ?checked=${this.tipos.includes(tipo)}
                @change=${this.toggleTipo}
              >
              ${tipo}
            </label>
          `)}
        </div>

        <label>Peso (kg):</label>
        <input type="number" min="1" .value=${this.peso} @input=${e => this.peso = e.target.value}>

        <label>Altura (m):</label>
        <input type="number" min="1" .value=${this.altura} @input=${e => this.altura = e.target.value}>

        <smart-button type="button" @click=${this.guardarPokemon}>Guardar Pokémon</smart-button>
      </form>
    `;
  }
}

customElements.define("form-component", FormComponent);