import { css } from 'lit-element';
 
export default css`
  :host {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
    width: 100%;
  }

  form {
    background-color: #ffffffcc;
    backdrop-filter: blur(6px);
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    padding: 2rem 2.5rem;
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  h2 {
    text-align: center;
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  label {
    font-size: 0.95rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.3rem;
  }

  input[type="text"],
  input[type="number"] {
    padding: 0.6rem 0.8rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    outline: none;
    transition: all 0.25s ease;
  }

  input[type="text"]:focus,
  input[type="number"]:focus {
    border-color: #3b4cca;
    box-shadow: 0 0 5px rgba(59, 76, 202, 0.3);
  }

  /* Contenedor de tipos */
  .tipos-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.6rem;
    margin-top: 0.3rem;
  }

  /* Estilo de cada tipo (checkbox visual) */
  .tipo-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 0.5rem 0.7rem;
    border: 1px solid #ddd;
    border-radius: 10px;
    background-color: #f5f6fa;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .tipo-item:hover {
    background-color: #e8ebff;
    border-color: #3b4cca;
  }

  .tipo-item input {
    accent-color: #3b4cca;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  /* Smart button */
  smart-button {
    width: 100%;
  }

  .button-demo {
    margin-top: 20px;
    margin-left: 20px;
  }

  .button-demo label {
    font-size: 18px;
    font-weight: normal;
    font-family: auto;
    color: white;
  }

  .demo-buttons-group {
    margin-top: 20px;
  }

  /* Efecto Glow del botón */
  smart-button.glow-on-hover {
    overflow: initial;
    width: auto;
    --smart-button-opacity-focus: initial;
    --smart-button-opacity-hover: initial;
    --smart-button-opacity-active: initial;
  }

  smart-button.glow-on-hover button {
    overflow: hidden;
  }

  smart-button.glow-on-hover button,
  .glow-on-hover {
    height: 50px;
    width: 100%;
    border: none;
    outline: none;
    color: #fff;
    background: #111;
    cursor: pointer;
    position: relative;
    z-index: 0;
    border-radius: 10px;
  }

  smart-button.glow-on-hover button:before,
  .glow-on-hover:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 0;
    transition: opacity .3s ease-in-out;
    border-radius: 10px;
  }

  smart-button.glow-on-hover button:active,
  .glow-on-hover:active {
    color: #000;
    --smart-button-color-active: #000;
  }

  smart-button.glow-on-hover:active button:after,
  .glow-on-hover:active:after {
    background: transparent;
  }

  smart-button.glow-on-hover:hover button:before,
  .glow-on-hover:hover:before {
    opacity: 1;
  }

  smart-button.glow-on-hover button:after,
  .glow-on-hover:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #111;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  @keyframes glowing {
    0% {
        background-position: 0 0;
    }

    50% {
        background-position: 400% 0;
    }

    100% {
        background-position: 0 0;
    }
  }
`;
