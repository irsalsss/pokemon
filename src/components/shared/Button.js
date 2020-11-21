import React from 'react';
import PropTypes from "prop-types";
import './Button.scss';

const Button = ({ onClick, customClassName, children }) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${customClassName ? customClassName : 'btn-primary'}`}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  customClassName: PropTypes.string,
  children: PropTypes.string.isRequired || PropTypes.element.isRequired
}

export default Button;