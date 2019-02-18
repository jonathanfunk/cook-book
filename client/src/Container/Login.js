import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { loginUser } from './../redux/actions/authActions';
import InputGroup from '../components/InputFields/InputGroup';
import Message from '../components/Message';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
  }

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    const { isAuthenticated, user } = this.props.auth;
    const { requestSent } = this.props.requesting;

    const loginForm = (
      <div className="column is-4 is-offset-4">
        <h3 className="title has-text-grey">Login</h3>
        <p className="subtitle has-text-grey">Please login to proceed.</p>
        <form className="box" onSubmit={this.onSubmit}>
          <InputGroup
            type="email"
            name="email"
            placeholder="Your Email"
            value={this.state.email}
            onChange={this.onChange}
            icon="fa fa-envelope"
            error={errors.email}
          />
          <InputGroup
            type="password"
            name="password"
            placeholder="Your Password"
            value={this.state.password}
            onChange={this.onChange}
            icon="fa fa-lock"
            error={errors.password}
          />
          <div className="field">
            <button
              type="submit"
              className={classnames(
                'button is-block is-primary is-large is-fullwidth',
                {
                  'is-loading': requestSent
                }
              )}
            >
              Login
            </button>
          </div>
        </form>
        <p className="has-text-grey">
          <Link to="/sign-up">Sign Up</Link>
        </p>
      </div>
    );

    return (
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container has-text-centered">
            {isAuthenticated ? (
              <Message
                title={`Hi ${user.name}!`}
                subtitle="You are logged in."
                linkURL="/create-recipe"
                linkText="Create Recipe"
              />
            ) : (
              loginForm
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  requesting: state.requesting
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
