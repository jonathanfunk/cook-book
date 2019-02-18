import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { signUpUser } from './../redux/actions/authActions';
import InputGroup from '../components/InputFields/InputGroup';
import Message from './../components/Message';

class SignUp extends Component {
  state = {
    name: '',
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    this.props.signUpUser(userData);
  };

  render() {
    const { errors } = this.state;
    const { isAuthenticated, user } = this.props.auth;
    const { requestSent } = this.props.requesting;

    const signUpForm = (
      <div className="column is-4 is-offset-4">
        <h3 className="title has-text-grey">Sign Up</h3>
        <p className="subtitle has-text-grey">Please sign up to proceed.</p>
        <form className="box" onSubmit={this.onSubmit}>
          <InputGroup
            type="text"
            name="name"
            placeholder="Your Name"
            value={this.state.name}
            onChange={this.onChange}
            icon="fa fa-user"
            error={errors.name}
          />
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
              Signup
            </button>
          </div>
        </form>
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
              signUpForm
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
  { signUpUser }
)(SignUp);
