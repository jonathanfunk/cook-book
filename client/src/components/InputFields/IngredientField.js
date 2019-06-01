import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({
  type,
  name,
  value,
  onChange,
  removeIngredient,
  error
}) => {
  return (
    <div className="field has-addons">
      <div className="control" />
      <div className="control is-expanded is-grouped">
        <input
          className="input is-large"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
      <div className="control">
        <button
          type="button"
          onClick={removeIngredient}
          className="button is-danger is-large"
        >
          <i className="fas fa-trash-alt" />
        </button>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

InputGroup.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default InputGroup;
