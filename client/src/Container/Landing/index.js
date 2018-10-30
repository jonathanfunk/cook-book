import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <section className="landing-hero hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <h1 className="title has-text-white">Getting Peckish?</h1>
            <div className="field is-grouped">
              <p className="control">
                <a href="#" className="button is-medium is-primary">
                  Find Recipes
                </a>
              </p>
              <p className="control">
                <a href="" className="button is-medium is-light">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
