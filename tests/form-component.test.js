import { fixture, html } from "@open-wc/testing";
import { screen, fireEvent } from "@testing-library/dom";
import "../src/components/form-component.js"; // ruta de tu componente

describe("FormComponent", () => {
  let element;

  beforeEach(async () => {
    localStorage.clear();
    element = await fixture(html`<form-component></form-component>`);
  });

  test("renderiza correctamente el formulario", () => {
    const title = element.shadowRoot.querySelector("h2");
    expect(title).not.toBeNull();
    expect(title.textContent).toContain("Agregar Pokémon");
  });

  test("valida campos requeridos antes de guardar", () => {
    const spy = jest.spyOn(window, "alert").mockImplementation(() => {});
    element.guardarPokemon();
    expect(spy).toHaveBeenCalledWith("Todos los campos son obligatorios.");
  });

  test("guarda un nuevo Pokémon en localStorage", () => {
    element.nombre = "Bulbasaur";
    element.tipos = ["Planta"];
    element.peso = "10";
    element.altura = "7";
    element.guardarPokemon();

    const data = JSON.parse(localStorage.getItem("pokemons"));
    expect(data).toHaveLength(1);
    expect(data[0].nombre).toBe("Bulbasaur");
  });

  test("limpia el formulario después de guardar", () => {
    element.nombre = "Charmander";
    element.tipos = ["Fuego"];
    element.peso = "8";
    element.altura = "6";
    element.guardarPokemon();

    expect(element.nombre).toBe("");
    expect(element.tipos).toEqual([]);
  });
});
