import { css } from 'lit-element';
 
export default css`

  h2 {
    text-align: center;
    color: #2c3e50;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
    
  /* This is the CSS used in the demo */
  .smart-table {
      --smart-table-row-detail-height: 110px;
      width: 100%;
      border-collapse: collapse;
    }

    .smart-table th, .smart-table td {
      border: 1px solid #333;
      padding: 8px;
      text-align: center;
    }

    .smart-table thead {
      /* background-color: rgb(82, 82, 247); */
      background-color: black;
      color: white;
    }

    .smart-table .smart-table-detail-container {
      display: flex;
    }

    .element-cell {
      border: 2px solid black;
      width: 75px;
      height: 85px;
      padding: 2px;
      margin-right: 10px;
    }

    .element-symbol,
    .element-name,
    .element-weight {
      text-align: center;
    }

    .element-symbol {
      font-weight: bold;
      font-size: 30px;
    }

    .element-name,
    .element-weight {
      font-size: 10px;
    }

    /* This is the CSS used in the demo */

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

/* Hover Glow Effect */
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