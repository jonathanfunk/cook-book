import React, { Component } from 'react';

class Landing extends Component {
  render() {
    return (
      <section className="landing-hero hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            <a href="#" className="button is-large is-primary">
              Find Recipes
            </a>
            <a href="" className="button is-large is-light">
              Sign Up
            </a>
          </div>
        </div>
      </section>
    );
  }
}

export default Landing;
