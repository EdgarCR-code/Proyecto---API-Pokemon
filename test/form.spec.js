import { expect } from "chai";
import sinon from "sinon";
import { FormComponent } from "../src/components/form/form.js";
import { MOCK_POKEMONS } from "../mock/pokemon-mocks.js";
import { query } from "lit-element/decorators.js";

describe("FormComponent", () => {
  let component;
  let sandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    component = new FormComponent();
    document.body.appendChild(component);

    // mock global modal
    global.modal = { show: sandbox.stub().resolves(true) };

    // mock localStorage
    const storage = {};
    sandbox
      .stub(window.localStorage, "getItem")
      .callsFake((key) => storage[key]);
    sandbox.stub(window.localStorage, "setItem").callsFake((key, val) => {
      storage[key] = val;
    });

    // spy dispatchEvent
    sandbox.spy(component, "dispatchEvent");
  });

  afterEach(() => {
    sandbox.restore();
    document.body.innerHTML = "";
  });

  describe("Inicialización y limpieza", () => {
    it("debe inicializar con valores por defecto", () => {
      expect(component.id).to.be.null;
      expect(component.nombre).to.equal("");
      expect(component.tipos).to.be.an("array").that.is.empty;
      expect(component.peso).to.equal("");
      expect(component.altura).to.equal("");
    });

    it("debe limpiar el formulario correctamente", () => {
      const pokemon = MOCK_POKEMONS.BULBASAUR;
      component.cargarPokemon(pokemon);

      component.limpiarFormulario();

      expect(component.id).to.be.null;
      expect(component.nombre).to.equal("");
      expect(component.tipos).to.be.empty;
      expect(component.peso).to.equal("");
      expect(component.altura).to.equal("");
    });

    it("debe cargar un Pokémon para edición", () => {
      const pokemon = MOCK_POKEMONS.CHARMANDER; // usamos el mock
      component.cargarPokemon(pokemon);

      expect(component.id).to.equal(1);
      expect(component.nombre).to.equal("Charmander");
      expect(component.tipos).to.deep.equal(["Fuego", "Dragón"]);
    });
  });

  describe("Guardar Pokémon", () => {
    it("debe mostrar alerta si los campos están incompletos", () => {
      const alertStub = sandbox.stub(window, "alert");
      component.guardarPokemon();
      expect(alertStub.calledOnce).to.be.true;
    });

    it("debe crear un nuevo Pokémon en localStorage si no tiene ID", () => {
      component.nombre = "Squirtle";
      component.tipos = ["Agua"];
      component.peso = 9;
      component.altura = 0.5;

      component.guardarPokemon();

      const data = JSON.parse(window.localStorage.setItem.firstCall.args[1]);
      expect(data).to.have.lengthOf(1);
      expect(data[0].nombre).to.equal("Squirtle");
      expect(global.modal.show.calledOnce).to.be.true;
      expect(component.dispatchEvent.calledOnce).to.be.true;
    });

    it("debe actualizar un Pokémon existente si tiene ID", () => {
      const existing = MOCK_POKEMONS.PIKACHU;
      window.localStorage.getItem.returns(JSON.stringify(existing));

      component.id = 25; // Misma id de pikachu, para actualizar los datos existentes
      component.nombre = "Raichu";
      component.tipos = ["Eléctrico"];
      component.peso = 30;
      component.altura = 0.8;

      component.guardarPokemon();

      const data = JSON.parse(window.localStorage.setItem.firstCall.args[1]);
      expect(data[0].nombre).to.equal("Raichu");
      expect(global.modal.show.calledOnce).to.be.true;
      expect(component.dispatchEvent.calledOnce).to.be.true;
    });

    it("debe crear nueva lista si localStorage está vacío", () => {
      window.localStorage.getItem.returns(null);
      component.nombre = "Charmander";
      component.tipos = ["Fuego"];
      component.peso = 10;
      component.altura = 1;

      component.guardarPokemon();

      const data = JSON.parse(window.localStorage.setItem.firstCall.args[1]);
      expect(data).to.have.lengthOf(1);
      expect(data[0].nombre).to.equal("Charmander");
    });
  });

  describe("Tipos de Pokémon", () => {
    it("debe evitar seleccionar más de 2 tipos", () => {
      component.tipos = MOCK_POKEMONS.TIPOS_CHECK;
      const e = { target: { value: "Agua", checked: true } };
      component.toggleTipo(e);
      expect(global.modal.show.calledOnce).to.be.true;
    });

    it("debe agregar tipos correctamente", () => {
      const addEvent = { target: { value: "Fuego", checked: true } };
      component.toggleTipo(addEvent);
      expect(component.tipos).to.include("Fuego");
    });

    it("Quitar tipo funciona correctamente", () => {
      const removeEvent = { target: { value: "Fuego", checked: false } };
      component.toggleTipo(removeEvent);
      expect(component.tipos).to.not.include("Fuego");
    });
  });

  describe("Renderizado (funciones flecha del template)", () => {
    it("debe prevenir el envío del formulario (submit)", async () => {
      await component.updateComplete;
      const form = component.shadowRoot.querySelector("form");
      const event = new Event("submit", { bubbles: true, cancelable: true });
      const result = form.dispatchEvent(event);
      expect(result).to.be.false; // si preventDefault() fue llamado, devuelve false
    });

    it("debe actualizar el nombre con el evento input", async () => {
      await component.updateComplete;
      const input = component.shadowRoot.querySelector('input[type="text"]');
      input.value = "Eevee";
      input.dispatchEvent(new Event("input"));
      await component.updateComplete;
      expect(component.nombre).to.equal("Eevee");
    });

    it("debe ejecutar toggleTipo al cambiar un checkbox", async () => {
      // Destruir cualquier render previo
      document.body.innerHTML = "";

      // Crear nuevo componente y stub antes del render
      component = new FormComponent();
      const stub = sinon.stub(component, "toggleTipo");

      // Renderizar
      document.body.appendChild(component);
      await component.updateComplete;

      // Buscar checkbox
      const checkbox = component.shadowRoot.querySelector(
        'input[type="checkbox"]'
      );
      expect(checkbox).to.exist;

      // Simular evento
      checkbox.checked = true;
      checkbox.dispatchEvent(
        new Event("change", { bubbles: true, composed: true })
      );
      await new Promise((r) => setTimeout(r, 10));

      expect(stub.calledOnce).to.be.true;
    });

    it("debe ejecutar toggleTipo al cambiar un checkbox", async () => {
      // Destruir cualquier render previo
      document.body.innerHTML = "";

      // Crear nuevo componente y stub antes del render
      component = new FormComponent();
      const stub = sinon.stub(component, "toggleTipo");

      // Renderizar
      document.body.appendChild(component);
      await component.updateComplete;

      // Buscar checkbox
      const checkbox = component.shadowRoot.querySelector(
        'input[type="checkbox"]'
      );
      expect(checkbox).to.exist;

      // Simular evento
      checkbox.checked = true;
      checkbox.dispatchEvent(
        new Event("change", { bubbles: true, composed: true })
      );
      await new Promise((r) => setTimeout(r, 10));

      expect(stub.calledOnce).to.be.true;
    });
  });

  it("debe renderizar los inputs de peso y altura correctamente", () => {
    const pesoInput = component.shadowRoot.querySelector("#input-peso");
    const alturaInput = component.shadowRoot.querySelector("#input-altura");

    expect(pesoInput).to.exist;
    expect(alturaInput).to.exist;
    expect(pesoInput.type).to.equal("number");
    expect(alturaInput.type).to.equal("number");
    expect(pesoInput.min).to.equal("1");
    expect(alturaInput.min).to.equal("1");
  });

  it("debe actualizar la propiedad 'peso' al ingresar un número", async () => {
    const pesoInput = component.shadowRoot.querySelector("#input-peso");

    pesoInput.value = "45";
    pesoInput.dispatchEvent(new Event("input"));
    await component.updateComplete;

    expect(component.peso).to.equal("45");
  });

  it("debe actualizar la propiedad 'altura' al ingresar un número", async () => {
    const alturaInput = component.shadowRoot.querySelector("#input-altura");

    alturaInput.value = "1.8";
    alturaInput.dispatchEvent(new Event("input"));
    await component.updateComplete;

    expect(component.altura).to.equal("1.8");
  });

  it("debe mantener los valores en el input luego del update", async () => {
    component.peso = "55";
    component.altura = "1.7";
    await component.updateComplete;

    const pesoInput = component.shadowRoot.querySelector("#input-peso");
    const alturaInput = component.shadowRoot.querySelector("#input-altura");

    expect(pesoInput.value).to.equal("55");
    expect(alturaInput.value).to.equal("1.7");
  });

  it("debe calcular correctamente el nuevo ID usando Math.max(...localData.map((p) => p.id))", async () => {
  // Simulamos datos existentes en localStorage
  const existingPokemons = [
    { id: 25, nombre: "Pikachu", tipos: "Eléctrico", peso: 6, altura: 0.4 },
    { id: 32, nombre: "Nidoran", tipos: "Veneno", peso: 7, altura: 0.5 },
  ];
  localStorage.setItem("pokemons", JSON.stringify(existingPokemons));

  // Usamos el modal stub del beforeEach
  const modalSpy = global.modal.show;

  // Creamos el componente
  const component = new FormComponent();
  document.body.appendChild(component);

  // Simulamos los valores del nuevo Pokémon
  component.nombre = "Charmander";
  component.tipos = ["Fuego"];
  component.peso = 8.5;
  component.altura = 0.6;

  // Ejecutamos guardarPokemon (entrará en el else sin this.id)
  component.guardarPokemon();

  // Obtenemos el nuevo array
  const updatedData = JSON.parse(localStorage.getItem("pokemons"));

  // Verificamos que se haya añadido el nuevo Pokémon
  const nuevoPokemon = updatedData.find((p) => p.nombre === "Charmander");
  expect(nuevoPokemon).to.exist;

  // El nuevo ID debe ser max(20, 32) + 1 = 33
  expect(nuevoPokemon.id).to.equal(33);

  // Verificamos que el modal fue mostrado correctamente
  expect(modalSpy.calledOnce).to.be.true;

  // Limpieza
  document.body.removeChild(component);
});
it("debe actualizar un Pokémon existente y ejecutar findIndex correctamente", async () => {
  // Datos iniciales
  const existingPokemons = [
    { id: 10, nombre: "Caterpie", tipos: "Bicho", peso: 2.9, altura: 0.3 },
    { id: 11, nombre: "Metapod", tipos: "Bicho", peso: 9.9, altura: 0.7 },
  ];
  localStorage.setItem("pokemons", JSON.stringify(existingPokemons));

  // Configurar el componente (reutiliza el del beforeEach)
  component.id = 10;
  component.nombre = "Caterpie Actualizado";
  component.tipos = ["Bicho"];
  component.peso = 3.1;
  component.altura = 0.35;

  // Ejecutar
  component.guardarPokemon();

  // Verificar localStorage
  const updatedData = JSON.parse(localStorage.getItem("pokemons"));
  const updated = updatedData.find((p) => p.id === 10);

  expect(updated).to.exist;
  expect(updated.nombre).to.equal("Caterpie Actualizado");
  expect(updated.peso).to.equal(3.1);
  expect(updated.altura).to.equal(0.35);

  // ✅ Aquí usamos el stub del beforeEach
  expect(global.modal.show.calledOnce).to.be.true;

  // También verifica el dispatchEvent
  expect(component.dispatchEvent.calledOnce).to.be.true;
});

});
