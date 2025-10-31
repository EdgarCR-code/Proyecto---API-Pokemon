import { expect } from "chai";
import sinon from "sinon";
import { FormComponent } from "../src/components/form/form.js";
import { MOCK_POKEMONS } from "../mock/pokemon-mocks.js";

describe("FormComponent", () => {
  let component;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    component = new FormComponent();
    document.body.appendChild(component);

    // mock global modal
    global.modal = { show: sandbox.stub().resolves(true) };

    // mock localStorage
    const storage = {};
    sandbox.stub(window.localStorage, "getItem").callsFake((key) => storage[key]);
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
});
