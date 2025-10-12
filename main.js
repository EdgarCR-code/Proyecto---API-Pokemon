// Importamos los componentes
import './src/components/form/form.js';
import './src/components/list/poke-list.js';

// Esperamos a que el DOM cargue
window.addEventListener('DOMContentLoaded', () => {
  const formulario = document.querySelector('form-component');
  const listado = document.querySelector('list-component');

  // 🔄 1. Actualiza el listado cuando se agrega un nuevo Pokémon
  formulario.addEventListener('pokemon-agregado', () => {
    listado.obtenerPokemons(); // vuelve a cargar los datos
  });

  // 📝 2. Escucha cuando se quiere editar un Pokémon del listado
  listado.addEventListener('editar-pokemon', (event) => {
    formulario.cargarPokemon(event.detail);
  });
});
