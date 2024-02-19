import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
  return (
    <button
      onClick={props.handleClick}
      disabled={props.isDisabled}
      className={props.classType || 'primary'}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  classType: PropTypes.string,
  disabled: PropTypes.string,
  handleClick: PropTypes.func,
};
