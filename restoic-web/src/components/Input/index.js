import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Input = ({
  value,
  placeholder,
  style,
  onChange,
  type,
  name,
  className = 'defaultInput',
  onKeyDown,
  onBlur,
  error,
  errorMessage,
  disabled,
  min,
  maxLength,
  errorClass
}) => (
  <Fragment>
    <input
      disabled={disabled}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={style}
      className={className}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
      min={min}
      maxLength={maxLength}
    />
    {
      error
      ? (
        <div className={errorClass}>
          {errorMessage}
        </div>
      ) : null
    }
  </Fragment>
);


Input.defaultProps = {
  value: '',
  placeholder: '',
  style: {},
  onChange: () => {},
  type: '',
  name: '',
  className: '',
  onKeyDown: () => {},
  onBlur: () => {},
  error: false,
  errorMessage: '',
  disabled: false,
  min: 0,
  maxLength: 200,
  errorClass: 'errorInput'
};

Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.shape({}),
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  onKeyDown: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  maxLength: PropTypes.number,
  errorClass: PropTypes.string,
};


export default Input;