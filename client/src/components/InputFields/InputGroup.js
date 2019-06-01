import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
  type,
  name,
  placeholder,
  value,
  icon,
  onChange,
  error
}) => {
  return (
    <div className="field">
      <div className="control has-icons-left">
        <input
          className="input is-large"
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <span className="icon is-large is-left">
          <i className={icon} />
        </span>
      </div>
      {error && <p class="help is-danger">{error}</p>}
    </div>
  );
};

InputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default InputGroup;
