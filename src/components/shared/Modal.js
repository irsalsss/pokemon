import React from 'react';
import PropTypes from "prop-types";
import './Modal.scss';

const Modal = ({ datacy = "modal", children, closeModal }) => {
  return (
    <div data-cy={datacy} className='modal'>
      <div data-testid='modal-overlay' className='overlay-modal' onClick={closeModal}></div>
      <div className='modal-content'>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  datacy: PropTypes.string,
  closeModal: PropTypes.func,
  children: PropTypes.element.isRequired
}

export default Modal;