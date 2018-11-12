import React from 'react';

const InputGroup = ({ type, name, placeholder, value, icon, onChange }) => {
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
    </div>
  );
};

export default InputGroup;
