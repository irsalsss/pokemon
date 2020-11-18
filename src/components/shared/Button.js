import React from 'react';
import PropTypes from "prop-types";
import './Button.scss';

const PrimaryButton = ({ onClick, customClassName, children }) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${customClassName ? customClassName : 'btn-primary'}`}
    >
      {children}
    </button>
  )
}

PrimaryButton.propTypes = {
  onClick: PropTypes.func,
  customClassName: PropTypes.string,
  children: PropTypes.string.isRequired || PropTypes.element.isRequired
}

const SecondaryButton = ({ onClick, customClassName, children}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${customClassName ? customClassName : 'btn-secondary'}`}
    >
      {children}
    </button>
  )
}

SecondaryButton.propTypes = {
  onClick: PropTypes.func,
  customClassName: PropTypes.string,
  children: PropTypes.string.isRequired || PropTypes.element.isRequired
}

export { PrimaryButton, SecondaryButton };