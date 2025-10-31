/* istanbul ignore file */

import { css } from "lit-element";

export const modalStyles = css`
  :host {
    position: fixed;
    inset: 0; 
    display: none;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
  }

  :host([visible]) {
    display: flex;
  }

  .modal {
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 320px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    animation: fadeIn 0.3s ease;
    text-align: center;
  }

  .modal h3 {
    margin: 0 0 10px;
    font-size: 18px;
  }

  .modal p {
    font-size: 14px;
    margin: 0;
    color: #333;
  }

  .buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  button {
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-weight: 500;
  }

  .confirm { background-color: #3b82f6; }
  .cancel { background-color: #ef4444; }
  .ok { background-color: #16a34a; }

  button:hover {
    opacity: 0.9;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;
