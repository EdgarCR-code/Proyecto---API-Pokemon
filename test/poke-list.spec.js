import { expect } from 'chai';
import sinon from 'sinon';
import { ListComponent } from '../src/components/list/poke-list.js';

describe('ListComponent', () => {
  let component;
  let fetchStub;
  let modalStub;

  beforeEach(() => {
    component = new ListComponent();
    
    // Mock global modal
    modalStub = sinon.stub();
    global.modal = { show: modalStub };

    // Limpiar localStorage
    localStorage.clear();
  });

  afterEach(() => {
    sinon.restore();
    fetchStub?.restore?.();
  });

  describe('Inicialización', () => {
    it('debería inicializar pokemons como array vacío', () => {
      expect(component.pokemons).to.be.an('array').that.is.empty;
    });
  });

  describe('Editar Pokémon', () => {
    it('editarPokemon dispara evento con el detalle correcto', () => {
      const spy = sinon.spy();
      component.addEventListener('editar-pokemon', spy);

      const pokemon = { id: 21, nombre: 'Test' };
      component.editarPokemon(pokemon);

      expect(spy.calledOnce).to.be.true;
      expect(spy.args[0][0].detail).to.deep.equal(pokemon);
    });
  });

  describe('Obtener Pokémon', () => {
    it('obtenerPokemons llena la lista con datos de API y localStorage', async () => {
      const apiResponse = { results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1' }] };
      const detailsResponse = { id: 1, name: 'bulbasaur', types: [{ type: { name: 'planta' } }], weight: 6, height: 0.7 };

      fetchStub = sinon.stub(global, 'fetch');
      fetchStub.onFirstCall().resolves({ json: async () => apiResponse });
      fetchStub.onSecondCall().resolves({ json: async () => detailsResponse });

      localStorage.setItem('pokemons', JSON.stringify([{ id: 50, nombre: 'local', tipos: 'fuego', peso: 10, altura: 1 }]));

      await component.obtenerPokemons();

      expect(component.pokemons).to.have.lengthOf(2);
      expect(component.pokemons[1].nombre).to.equal('local');
    });

    it('obtenerPokemons llama modal.show en caso de error', async () => {
      fetchStub = sinon.stub(global, 'fetch').rejects(new Error('API fail'));

      await component.obtenerPokemons();

      expect(modalStub.calledOnce).to.be.true;
      expect(modalStub.args[0][0].title).to.equal('Error al obtener Pokémon');
    });
  });

  describe('Eliminar Pokémon', () => {
    it('eliminarPokemon elimina Pokémon si se confirma', async () => {
      localStorage.setItem('pokemons', JSON.stringify([{ id: 30, nombre: 'Test', tipos: 'agua', peso: 10, altura: 1 }]));
      component.pokemons = [{ id: 30, nombre: 'Test' }];

      // Simular modal de confirmación
      const fakeModal = { show: sinon.stub().resolves(true) };
      global.document.querySelector = sinon.stub().returns(fakeModal);

      await component.eliminarPokemon(30);

      const stored = JSON.parse(localStorage.getItem('pokemons'));
      expect(stored).to.have.lengthOf(0);
      expect(component.pokemons).to.have.lengthOf(0);
    });

    it('eliminarPokemon no elimina si se cancela', async () => {
      const fakeModal = { show: sinon.stub().resolves(false) };
      global.document.querySelector = sinon.stub().returns(fakeModal);

      component.pokemons = [{ id: 99, nombre: 'Test' }];
      localStorage.setItem('pokemons', JSON.stringify([{ id: 99, nombre: 'Test' }]));

      await component.eliminarPokemon(99);

      const stored = JSON.parse(localStorage.getItem('pokemons'));
      expect(stored).to.have.lengthOf(1);
      expect(component.pokemons).to.have.lengthOf(1);
    });
  });
});
