import React from 'react';

const TextArea = ({ name, placeholder, value, onChange, error }) => {
  return (
    <div className="field">
      <div className="control">
        <textarea
          className="textarea is-large"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <p class="help is-danger">{error}</p>}
    </div>
  );
};

export default TextArea;
