# Pokédex – Proyecto con LitElement y PokéAPI

Aplicación web tipo CRUD que muestra información proveniente de la **PokéAPI** y permite crear, editar y eliminar Pokémon personalizados.  
Combina datos reales de la API con información almacenada localmente mediante **LocalStorage**, haciendo uso de **Web Components** desarrollados con **LitElement** y elementos de interfaz proporcionados por **Smart Web Components**.

---

## Características principales

- **READ**: muestra Pokémon obtenidos directamente de la PokéAPI.  
- **CREATE / UPDATE / DELETE**: permite la gestión completa de Pokémon personalizados.  
- **Persistencia local**: utiliza LocalStorage para guardar los datos creados por el usuario.  
- **Interfaz dinámica**: implementada con componentes de Smart Web Components.

---

## Tecnologías utilizadas

- [LitElement](https://lit.dev/)  
- [PokéAPI](https://pokeapi.co/)  
- [Smart Web Components](https://www.htmlelements.com/docs/)  
- [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/)  
- HTML5 / CSS3 / JavaScript (ES Modules)

---

## Instalación y ejecución

1. Abre una terminal y navega hasta la ruta donde deseas clonar el repositorio.  
   **Ejemplo:**  
   ```bash
   cd "C:\Users\ecabrram\OneDrive - NTT DATA EMEAL\Documentos"
   ```

2. Clona el repositorio y accede a la carpeta del proyecto:  
   ```bash
   git clone https://github.com/EdgarCR-code/Proyecto---API-Pokemon
   cd "Proyecto - API Pokemon"
   ```

3. Instala las dependencias necesarias:  
   ```bash
   npm install
   ```

Con esto, la aplicación estará lista para probarse en el navegador.


# Instrucciones de uso

1. **Inicia la aplicación**
   - Ejecuta el comando:
     ```bash
     npm start
     ```
     Esto abrirá automáticamente la aplicación en tu navegador, normalmente en:  
      `http://localhost:8000`

2. **Visualiza los Pokémon de la PokéAPI**
   - Al cargar la página, verás una **tabla** con los primeros 20 Pokémon obtenidos directamente desde la PokéAPI.  
   - Estos Pokémon se muestran solo como **referencia** (no se pueden editar ni eliminar).  

3. **Agrega tus propios Pokémon personalizados**
   - En la parte superior de la página encontrarás un **formulario** con los siguientes campos:
     - **Nombre:** texto libre.  
     - **Tipos:** puedes seleccionar uno o varios tipos (Agua, Fuego, Planta, etc.).  
     - **Peso:** número en kilogramos.  
     - **Altura:** número en metros.  
   - Da clic en el botón **“Guardar Pokémon”**.  
   - Tu Pokémon aparecerá al final de la tabla, con su propio **ID consecutivo**, después de los Pokémon de la API.  

4. **Editar un Pokémon personalizado**
   - Localiza tu Pokémon en la tabla y da clic en el botón **“Editar”**.  
   - El formulario se llenará automáticamente con sus datos.  
   - Realiza los cambios que desees y presiona **“Guardar Cambios”**.  
   - El Pokémon se actualizará sin modificar su ID original.  

5. **Eliminar un Pokémon personalizado**
   - En la tabla, da clic en el botón **“Eliminar”** del Pokémon que quieras quitar.  
   - Se mostrará una confirmación; al aceptar, el Pokémon será eliminado del **LocalStorage** y desaparecerá de la tabla.  

6. **Persistencia de datos**
   - Los Pokémon que agregues o edites se guardan en el **LocalStorage** del navegador.  
   - Si cierras o recargas la página, tus Pokémon personalizados **seguirán apareciendo**.  

7. **Pokémon de la API vs. Pokémon locales**
   - Los Pokémon de la API aparecen con un texto *“API”* en la columna de acciones.  
   - Los Pokémon locales tienen los botones **Editar** y **Eliminar** disponibles.  
