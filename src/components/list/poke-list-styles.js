import { css } from 'lit-element';
 
export default css`
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
      background-color: #f4f4f4;
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

    button {
      background-color: #3b82f6;
      border: none;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #2563eb;
    }
  `;