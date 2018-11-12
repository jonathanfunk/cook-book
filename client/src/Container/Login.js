import React, { Component } from 'react';
import InputGroup from '../Components/InputFields/InputGroup';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

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
    console.log('User data is...', userData);
  };

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
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
                />
                <InputGroup
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  value={this.state.password}
                  onChange={this.onChange}
                  icon="fa fa-lock"
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
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
