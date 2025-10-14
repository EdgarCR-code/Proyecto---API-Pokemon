import { LitElement, html, css } from "lit-element";
import styles from "./poke-list-styles.js";

export class ListComponent extends LitElement {
  static properties = {
    pokemons: { type: Array }
  };
  static styles = [styles];

  constructor() {
    super();
    this.pokemons = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.obtenerPokemons();
  }

  async obtenerPokemons() {
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await res.json();

      const detalles = await Promise.all(
        data.results.map(async (p) => {
          const info = await fetch(p.url).then(r => r.json());
          return {
            id: info.id,
            nombre: info.name,
            tipos: info.types.map(t => t.type.name).join(", "),
            peso: info.weight,
            altura: info.height
          };
        })
      );

      this.pokemons = detalles;
      const localData = JSON.parse(localStorage.getItem("pokemons"));
      this.pokemons = [...this.pokemons, ...localData];
    } catch (error) {
      console.error("Error al obtener los Pokémon:", error);
    }
    
  }

    render() {
        return html`
        <h2>Lista de Pokémon</h2>
        <table class="smart-table">
            <thead>
            <tr>
                <th>ID</th><th>Nombre</th><th>Tipo</th><th>Peso</th><th>Altura</th><th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            ${this.pokemons.map(p => html`
                <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>${p.tipos}</td>
                <td>${p.peso}</td>
                <td>${p.altura}</td>
                <td>
                  ${p.id > 20 // Pokémon de la API
                    ? html`
                    <smart-button class="glow-on-hover" @click=${() => this.editarPokemon(p)}>Editar</smart-button>
                    <smart-button class="glow-on-hover" @click=${() => this.eliminarPokemon(p.id)}>Eliminar</smart-button>`
                  : html`<em>API</em>`}
                </td>
                </tr>
            `)}
            </tbody>
        </table>

        
        `;
    }

  

  editarPokemon(pokemon) {
    this.dispatchEvent(new CustomEvent("editar-pokemon", { 
      detail: pokemon ,
      bubbles: true,
      composed: true
    }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  eliminarPokemon(id) {
    if (confirm("¿Eliminar este Pokémon?")) {
      const localData = JSON.parse(localStorage.getItem("pokemons")) || [];
      const actualizado = localData.filter(p => p.id !== id);
      localStorage.setItem("pokemons", JSON.stringify(actualizado));
      this.pokemons = actualizado;
      window.location.reload();
    }
  }
}

customElements.define("list-component", ListComponent);
