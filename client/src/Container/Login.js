import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from './../redux/actions/authActions';
import InputGroup from '../components/InputFields/InputGroup';
import LoggedIn from './../components/LoggedIn';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    userName: ''
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({ userName: this.props.auth.user.name });
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      return { userName: nextProps.auth.user.name };
    }
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
            <button className="button is-block is-primary is-large is-fullwidth">
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
            {this.state.userName ? (
              <LoggedIn userName={this.state.userName} />
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
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
