import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from './../redux/actions/authActions';
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

  logoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const loggedOutNavItems = (
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <Link to="/sign-up" className="button is-light">
              Sign up
            </Link>
            <Link to="/login" className="button is-primary">
              Login
            </Link>
          </div>
        </div>
      </div>
    );

    const loggedInNavItems = (
      <div className="navbar-end">
        <div className="navbar-item">
          <img src={user.avatar} alt={user.name} />
        </div>
        <div className="navbar-item">
          <div className="buttons">
            <button onClick={this.logoutClick} className="button is-primary">
              Log Out
            </button>
          </div>
        </div>
      </div>
    );

    return (
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <span className="title has-text-white">Cook Book</span>
          </Link>
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
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/recipes" className="navbar-item">
              Recipes
            </Link>
            <Link to="/create-recipe" className="navbar-item">
              Create Recipe
            </Link>
          </div>
          {isAuthenticated ? loggedInNavItems : loggedOutNavItems}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

Navigation.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navigation);
