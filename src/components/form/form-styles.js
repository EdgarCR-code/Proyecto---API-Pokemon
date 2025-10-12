import { css } from 'lit-element';
 
export default css`
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 300px;
      margin-bottom: 20px;
    }

    label {
      font-weight: bold;
    }

    input, select {
      padding: 6px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }

    select[multiple] {
      height: 120px;
    }

    button {
      background-color: #3b82f6;
      color: white;
      border: none;
      padding: 8px;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #2563eb;
    }
  `;