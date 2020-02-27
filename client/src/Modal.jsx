import React, { useState } from 'react';
import ReactDOM from ReactDOM;

const Modal = ({ children }) => (
    ReactDOM.createPortal(
      <div className="modal">
        {children}
      </div>,
      document.getElementById('modal-root')
    )
  );

export default Modal;