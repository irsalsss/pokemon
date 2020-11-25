import React from 'react';
import PropTypes from "prop-types";
import './Button.scss';

const Button = ({ onClick, customClassName, children, disabled = false, datacy = '' }) => {
  return (
    <button
      data-testid="button"
      data-cy={datacy}
      disabled={disabled}
      onClick={onClick}
      className={`btn ${customClassName ? customClassName : 'btn-primary'}`}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  datacy: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  customClassName: PropTypes.string,
  children: PropTypes.string.isRequired || PropTypes.element.isRequired
}

export default Button;