import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <section className="landing-hero hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-white">Getting Peckish?</h1>
            <div className="field is-grouped">
              <p className="control">
                <Link to="/recipes" className="button is-medium is-primary">
                  Find Recipes
                </Link>
              </p>
              <p className="control">
                <Link to="/sign-up" className="button is-medium is-light">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
