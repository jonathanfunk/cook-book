import React from 'react';

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
          <i class="fas fa-trash-alt" />
        </button>
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default InputGroup;
