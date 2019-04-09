import React from 'react';
import { Link } from 'react-router-dom';

const LoggedIn = ({ title, subtitle, linkURL, linkText }) => {
  return (
    <div className="column is-4 is-offset-4">
      <h3 className="title has-text-grey">{title}</h3>
      <p className="subtitle has-text-grey">{subtitle}</p>
      <Link to={linkURL} className="button is-medium is-primary is-centered">
        {linkText}
      </Link>
    </div>
  );
};

export default LoggedIn;
