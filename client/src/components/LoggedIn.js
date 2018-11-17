import React from 'react';
import { Link } from 'react-router-dom';

const LoggedIn = ({ userName }) => {
  return (
    <div className="column is-4 is-offset-4">
      <h3 className="title has-text-grey">Hi {userName}!</h3>
      <p className="subtitle has-text-grey">You are logged in.</p>
      <div className="box has-text-centered">
        <Link
          to="/create-recipe"
          className="button is-medium is-primary is-centered"
        >
          Create Recipe
        </Link>
      </div>
    </div>
  );
};

export default LoggedIn;
