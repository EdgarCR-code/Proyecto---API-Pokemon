import { fixture, html } from "@open-wc/testing";
import { screen } from "@testing-library/dom";
import "../src/components/list-component.js";

beforeAll(() => {
  fetch.resetMocks();
});

describe("ListComponent", () => {
  let element;

  beforeEach(async () => {
    localStorage.clear();
    fetch.resetMocks();
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          { name: "pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
        ],
      })
    );
    fetch.mockResponseOnce(
      JSON.stringify({
        id: 25,
        name: "pikachu",
        types: [{ type: { name: "electric" } }],
        weight: 60,
        height: 4,
      })
    );

    element = await fixture(html`<list-component></list-component>`);
  });

  test("llama al API y muestra el Pokémon", async () => {
    // Esperamos un pequeño tiempo a que se renderice el fetch
    await new Promise((r) => setTimeout(r, 100));

    const rows = element.shadowRoot.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(1);
    expect(rows[0].textContent).toContain("pikachu");
  });

  test("combina Pokémon locales con los de la API", async () => {
    localStorage.setItem(
      "pokemons",
      JSON.stringify([{ id: 21, nombre: "testmon", tipos: "normal" }])
    );

    await element.obtenerPokemons();
    expect(element.pokemons.some((p) => p.nombre === "testmon")).toBe(true);
  });

  test("elimina Pokémon correctamente", async () => {
    // Añadir manualmente un Pokémon
    localStorage.setItem(
      "pokemons",
      JSON.stringify([{ id: 30, nombre: "Squirtle" }])
    );
    element.pokemons = [{ id: 30, nombre: "Squirtle" }];
    await element.updateComplete;

    // Mock modal
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.show = jest.fn().mockResolvedValue(true);
    document.body.append(modal);

    await element.eliminarPokemon(30);
    const localData = JSON.parse(localStorage.getItem("pokemons"));
    expect(localData).toHaveLength(0);
  });
});
