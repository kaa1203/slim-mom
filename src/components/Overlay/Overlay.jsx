// Overlay.js
import React from 'react';
import css from './Overlay.module.css'; // We'll create this CSS module next

export const Overlay = ({ children, onClick }) => {
  return (
    <div className={css.overlay} onClick={onClick}>
      {children}
    </div>
  );
};
