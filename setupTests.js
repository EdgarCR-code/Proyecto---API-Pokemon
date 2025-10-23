// setupTests.js
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();


// 🔹 Mock básico de localStorage para evitar errores
const localStorageMock = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = String(value);
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

// 🔹 Evita errores si se usan funciones de alert/confirm
global.alert = jest.fn();
global.confirm = jest.fn(() => true);

// 🔹 Si usas un modal global (como en tu código)
global.modal = {
  show: jest.fn().mockResolvedValue(true),
};
