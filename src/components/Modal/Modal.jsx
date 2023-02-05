import React, { useRef } from "react";
import "../Modal/modal.css";

export const Modal = ({ modal, setModal, children, title }) => {
  const overlayRef = useRef();

  const handleOverlay = (evt) => {
    if (evt.target === overlayRef.current) {
      setModal(false);
    }
  };
  return (
    <div
      ref={overlayRef}
      onClick={(evt) => handleOverlay(evt)}
      className={`overlay ${modal ? "open" : ""}`}
    >
      <div className="modal-wrapper">
        <button
          onClick={() => setModal(false)}
          className="btn btn-dark modal-button rounded-0"
        >
          &times;
        </button>
        <div className="modal-header">
          <h3>{title}</h3>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};
