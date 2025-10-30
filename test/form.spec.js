import { expect } from 'chai';
import sinon from 'sinon';
import { FormComponent } from '../src/components/form/form.js';

describe('FormComponent', () => {
  let component;
  let modalShowStub;

  beforeEach(() => {
    // Crear instancia del componente
    component = new FormComponent();

    // Mockear modal.show global (supongo que es un objeto global)
    global.modal = { show: sinon.stub() };

    // Limpiar localStorage antes de cada test
    localStorage.clear();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('debería inicializar las propiedades correctamente', () => {
    expect(component.id).to.be.null;
    expect(component.nombre).to.equal('');
    expect(component.tipos).to.be.an('array').that.is.empty;
    expect(component.peso).to.equal('');
    expect(component.altura).to.equal('');
    expect(component.tiposDisponibles).to.include('Agua');
    expect(component.tiposDisponibles).to.include('Fuego');
  });

  it('guardarPokemon agrega un nuevo Pokémon al localStorage', () => {
    component.nombre = 'Pikachu';
    component.tipos = ['Eléctrico'];
    component.peso = 6;
    component.altura = 0.4;

    const eventSpy = sinon.spy();
    component.addEventListener('pokemon-agregado', eventSpy);

    component.guardarPokemon();

    const pokemons = JSON.parse(localStorage.getItem('pokemons'));
    expect(pokemons).to.have.lengthOf(1);
    expect(pokemons[0].nombre).to.equal('Pikachu');
    expect(eventSpy.calledOnce).to.be.true;
    expect(modal.show.calledOnce).to.be.true;
  });

  it('guardarPokemon muestra alerta si faltan campos', () => {
    const alertStub = sinon.stub(window, 'alert');

    component.guardarPokemon();

    expect(alertStub.calledOnce).to.be.true;
  });

  it('cargarPokemon llena correctamente el formulario', () => {
    const pokemon = {
      id: 5,
      nombre: 'Bulbasaur',
      tipos: 'Planta, Veneno',
      peso: 6.9,
      altura: 0.7
    };

    component.cargarPokemon(pokemon);

    expect(component.id).to.equal(5);
    expect(component.nombre).to.equal('Bulbasaur');
    expect(component.tipos).to.deep.equal(['Planta', 'Veneno']);
    expect(component.peso).to.equal(6.9);
    expect(component.altura).to.equal(0.7);
  });

  it('toggleTipo agrega y quita tipos correctamente', () => {
    // Simular evento de checkbox
    const fakeEvent = (value, checked) => ({
      target: { value, checked }
    });

    component.toggleTipo(fakeEvent('Fuego', true));
    expect(component.tipos).to.include('Fuego');

    component.toggleTipo(fakeEvent('Fuego', false));
    expect(component.tipos).to.not.include('Fuego');
  });

  it('toggleTipo no permite más de 2 tipos', () => {
    const fakeEvent = (value, checked) => ({
      target: { value, checked }
    });

    component.toggleTipo(fakeEvent('Fuego', true));
    component.toggleTipo(fakeEvent('Agua', true));
    component.toggleTipo(fakeEvent('Planta', true));

    expect(component.tipos.length).to.equal(2);
    expect(modal.show.calledOnce).to.be.true;
  });
});
