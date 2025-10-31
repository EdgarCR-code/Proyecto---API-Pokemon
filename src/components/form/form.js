import { LitElement, html, css } from "lit-element";
import styles from "./form-styles.js";

export class FormComponent extends LitElement {
  static styles = [styles];
  static properties = {
    id: { type: Number },
    nombre: { type: String },
    tipos: { type: Array },
    peso: { type: Number },
    altura: { type: Number },
    tiposDisponibles: { type: Array },
  };

  constructor() {
    super();
    this.id = null;
    this.nombre = "";
    this.tipos = [];
    this.peso = "";
    this.altura = "";
    this.tiposDisponibles = [
      "Agua",
      "Fuego",
      "Planta",
      "Eléctrico",
      "Roca",
      "Tierra",
      "Normal",
      "Lucha",
      "Siniestro",
      "Acero",
      "Psíquico",
      "Fantasma",
      "Bicho",
      "Veneno",
      "Volador",
      "Hada",
      "Hielo",
      "Dragón",
    ];
  }

  // Guardar o actualizar Pokémon
  guardarPokemon() {
    if (
      !this.nombre ||
      this.tipos.length === 0 ||
      this.peso === "" ||
      this.altura === ""
    ) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    
    let localData = JSON.parse(localStorage.getItem('pokemons') || '[]');
    if (!Array.isArray(localData)) {
      localData = [];
    }


    let nuevo;
    if (this.id) {
      // Actualizar pokemon existente
      // Si tiene ID → actualizar el existente
      nuevo = {
        id: this.id,
        nombre: this.nombre,
        tipos: this.tipos.join(", "),
        peso: this.peso,
        altura: this.altura,
      };

      const index = localData.findIndex((p) => p.id === this.id);
      if (index !== -1) {
        localData[index] = nuevo;
      } else {
        // si no estaba en localStorage (por alguna razón), lo agregamos
        localData.push(nuevo);
      }

      modal.show({
        title: "Pokémon actualizado",
        message: `El Pokémon "${this.nombre}" fue actualizado.`,
        type: "success",
        autoClose: true
      });
      
    } else {
      // Crear nuevo Pokemon
      //Si no tiene ID → crear nuevo
      const maxApiId = 20; //Es el numero de pokemos que pedimos en el fetch de la API
      const maxLocalId =
        localData.length > 0 ? Math.max(...localData.map((p) => p.id)) : 0;
      const nuevoId = Math.max(maxApiId, maxLocalId) + 1;

      nuevo = {
        id: nuevoId,
        nombre: this.nombre,
        tipos: this.tipos.join(", "),
        peso: this.peso,
        altura: this.altura,
      };

      localData.push(nuevo);
      
      modal.show({
        title: "Pokémon agregado",
        message: `El Pokémon "${this.nombre}" fue añadido.`,
        type: "success",
        autoClose: true
      });
    }
    
    localStorage.setItem("pokemons", JSON.stringify(localData));

      

    this.dispatchEvent(
      new CustomEvent("pokemon-agregado", { bubbles: true, composed: true })
    );

    this.limpiarFormulario();
    //window.location.reload();
  }

  //Cargar Pokémon para edición
  cargarPokemon(pokemon) {
    this.id = pokemon.id;
    this.nombre = pokemon.nombre;
    this.tipos = pokemon.tipos.split(", ").filter(Boolean);
    this.peso = pokemon.peso;
    this.altura = pokemon.altura;
  }

  limpiarFormulario() {
    this.id = null;
    this.nombre = "";
    this.tipos = [];
    this.peso = "";
    this.altura = "";
    this.requestUpdate();
  }

  //Funcion para agregar o quitar tipos en el pokemon personalizado
  toggleTipo(e) {
    const tipo = e.target.value;

    if (e.target.checked) {
      if (this.tipos.length >= 2) {
        // Evita seleccionar más de 2 tipos
        e.target.checked = false;
        
        modal.show({
          title: "Selección de tipos",
          message: `Solo puedes seleccionar 2 tipos.`,
          type: "error",
          autoClose: true
        });
        
        return;
      }
      this.tipos = [...this.tipos, tipo];
    } else {
      this.tipos = this.tipos.filter((t) => t !== tipo);
    }

    this.requestUpdate();
  }

  render() {
    return html`
      
      <form @submit=${(e) => e.preventDefault()}>
        <h2>${this.id ? `Editar Pokémon #${this.id}` : "Agregar Pokémon"}</h3>
        <label>Nombre:</label>
        <input type="text" placeholder="Ej. Pikachu" .value=${
          this.nombre
        } @input=${(e) => (this.nombre = e.target.value)}>

        <label>Tipo(s):</label>
        <div class="tipos-container" id="tipos-container">
          ${this.tiposDisponibles.map(
            (tipo) => html`
              <label class="tipo-item">
                <input
                  type="checkbox"
                  value=${tipo}
                  ?checked=${this.tipos.includes(tipo)}
                  @change=${this.toggleTipo}
                />
                ${tipo}
              </label>
            `
          )}
        </div>

        <label>Peso (kg):</label>
        <input type="number" min="1" .value=${this.peso} @input=${(e) =>
      (this.peso = e.target.value)}>

        <label>Altura (m):</label>
        <input type="number" min="1" .value=${this.altura} @input=${(e) =>
      (this.altura = e.target.value)}>

        <smart-button class="glow-on-hover" type="button" @click=${
          this.guardarPokemon
        }>
          ${
            this.id ? "Actualizar Pokémon" : "Guardar Pokémon"
          } <!-- Botón para guardar o actualizar Pokémon -->
        </button>
      </form>
    `;
  }
}

customElements.define("form-component", FormComponent);
