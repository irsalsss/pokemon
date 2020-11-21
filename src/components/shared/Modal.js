import React from 'react';
import PropTypes from "prop-types";
import './Modal.scss';

const Modal = ({ children, closeModal }) => {
  return (
    <div className='modal'>
      <div className="overlay-modal" onClick={closeModal}></div>
      <div className="modal-content">
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  closeModal: PropTypes.func,
  children: PropTypes.element.isRequired
}

export default Modal;