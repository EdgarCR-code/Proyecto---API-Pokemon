require('jest-fetch-mock').enableMocks();
const { JSDOM } = require('jsdom');
const { fireEvent } = require('@testing-library/dom');

// Creamos un DOM simulado
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);
global.document = dom.window.document;
global.window = dom.window;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;
global.CustomEvent = dom.window.CustomEvent;

// Mock localStorage
global.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

// Mock del modal global
global.modal = {
  show: jest.fn(),
};

// Exponer fireEvent globalmente
global.fireEvent = fireEvent;
