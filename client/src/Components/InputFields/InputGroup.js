import React from 'react';

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

export default InputGroup;
