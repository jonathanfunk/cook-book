import React, { Component } from 'react';
import classnames from 'classnames';

class Navigation extends Component {
  state = {
    isActive: false
  };

  toggleClass = e => {
    e.preventDefault();
    const currentState = this.state.isActive;
    this.setState({ isActive: !currentState });
  };
  render() {
    return (
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a href="#" className="navbar-item" href="https://bulma.io">
            <h1 className="title has-text-white">Cook Book</h1>
          </a>
          <button
            className={classnames('navbar-burger burger', {
              'is-active': this.state.isActive
            })}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={this.toggleClass}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div
          className={classnames('navbar-menu', {
            'is-active': this.state.isActive
          })}
        >
          <div className="navbar-start">
            <a href="#" className="navbar-item">
              Home
            </a>
            <a href="#" className="navbar-item">
              Recipes
            </a>
            <a href="#" className="navbar-item">
              Create Recipe
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href="#" className="button is-light">
                  Sign up
                </a>
                <a href="#" className="button is-primary">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
