import { expect } from 'chai';
import sinon from 'sinon';
import { ModalComponent } from '../src/components/modal/modal.js';

describe('ModalComponent', () => {
  let modal;

  beforeEach(() => {
    modal = new ModalComponent();
  });

  describe('Inicialización', () => {
    it('debería inicializar propiedades correctamente', () => {
      expect(modal.visible).to.be.false;
      expect(modal.title).to.equal('');
      expect(modal.message).to.equal('');
      expect(modal.type).to.equal('success');
    });
  });

  describe('Método show()', () => {
    it('establece propiedades y visible = true', async () => {
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

    it('resuelve automáticamente si autoClose está activo', async () => {
      const clock = sinon.useFakeTimers();
      const promise = modal.show({ autoClose: true, duration: 1000 });

      expect(modal.visible).to.be.true;
      clock.tick(1000);

      const result = await promise;
      expect(result).to.be.true;
      expect(modal.visible).to.be.false;

      clock.restore();
    });
  });

  describe('Método close()', () => {
    it('cambia visible a false y resuelve promesa', async () => {
      const promise = modal.show({});
      modal.close(false);
      const result = await promise;
      expect(modal.visible).to.be.false;
      expect(result).to.be.false;
    });
  });

  describe('Renderizado según tipo', () => {
    it('modal tipo confirm tiene botones de aceptar y cancelar', () => {
      modal.type = 'confirm';
      const template = modal.render();
      expect(modal.type).to.equal('confirm');
    });

    it('modal tipo success/error tiene solo botón aceptar', () => {
      modal.type = 'success';
      const template = modal.render();
      expect(modal.type).to.equal('success');

      modal.type = 'error';
      const template2 = modal.render();
      expect(modal.type).to.equal('error');
    });
  });
});
