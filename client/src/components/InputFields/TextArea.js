import React from 'react';
import PropTypes from 'prop-types';

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

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default TextArea;
