import React from 'react';
import PropTypes from "prop-types";
import './Button.scss';

const Button = ({ onClick, customClassName, children, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn ${customClassName ? customClassName : 'btn-primary'}`}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  customClassName: PropTypes.string,
  children: PropTypes.string.isRequired || PropTypes.element.isRequired
}

export default Button;