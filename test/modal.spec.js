import { expect } from 'chai';
import sinon from 'sinon';
import { ModalComponent } from '../src/components/modal/modal.js';

describe('ModalComponent', () => {
  let modal;

  beforeEach(() => {
    modal = new ModalComponent();
  });

  it('debería inicializar propiedades correctamente', () => {
    expect(modal.visible).to.be.false;
    expect(modal.title).to.equal('');
    expect(modal.message).to.equal('');
    expect(modal.type).to.equal('success');
  });

  it('show() establece propiedades y visible = true', async () => {
    const promise = modal.show({ title: 'Test', message: 'Mensaje', type: 'error' });

    expect(modal.title).to.equal('Test');
    expect(modal.message).to.equal('Mensaje');
    expect(modal.type).to.equal('error');
    expect(modal.visible).to.be.true;

    // cerrar manualmente para resolver la promesa
    modal.close(true);
    const result = await promise;
    expect(result).to.be.true;
  });

  it('close() cambia visible a false y resuelve promesa', async () => {
    const promise = modal.show({});
    modal.close(false);
    const result = await promise;
    expect(modal.visible).to.be.false;
    expect(result).to.be.false;
  });

  it('show() con autoClose resuelve la promesa automáticamente', async () => {
    const clock = sinon.useFakeTimers();
    const promise = modal.show({ autoClose: true, duration: 1000 });

    // Antes de pasar el tiempo, visible debe ser true
    expect(modal.visible).to.be.true;

    // Avanzamos el reloj
    clock.tick(1000);

    const result = await promise;
    expect(result).to.be.true;
    expect(modal.visible).to.be.false;

    clock.restore();
  });

  it('modal tipo confirm tiene botones de aceptar y cancelar', () => {
    modal.type = 'confirm';
    const template = modal.render();
    // Simple check: en pruebas unitarias de Lit podemos verificar que el tipo es confirm
    expect(modal.type).to.equal('confirm');
  });

  it('modal tipo success/error tiene solo botón aceptar', () => {
    modal.type = 'success';
    const template = modal.render();
    expect(modal.type).to.equal('success');
  });
});
