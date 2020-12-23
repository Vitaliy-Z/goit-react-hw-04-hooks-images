import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ onClose, largeImageURL }) {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        console.log('Escape');
        onClose();
      }
    });
  }, [onClose]);

  const handelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handelBackdropClick}>
      <div className="Modal">
        <a href={largeImageURL}>
          <img src={largeImageURL} alt="" />
        </a>
      </div>
    </div>,
    document.querySelector('#modal-root'),
  );
}
