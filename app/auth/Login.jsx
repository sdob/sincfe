import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from './actions';

// Nope, no idea
const form = reduxForm({
  form: 'login',
});

class Login extends Component {

  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { errorObj } = this.props;
    if (nextProps.error !== errorObj) {
      console.error('error is changing');
    }
  }

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="sinc-sidebar__section">
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>
          <div className="sinc-sidebar__header">
            <h2>Login</h2>
          </div>
          <div className="sinc-sidebar__menu">
            <div className="sinc-sidebar__content">
              <div className={`form-group${(this.props.errorObj ? ' has-danger' : '')}`}>
                <label className="form-control-label" htmlFor="loginFormUsername">CFT number</label>
                <Field
                  id="loginFormUsername"
                  name="username"
                  className="form-control"
                  component="input"
                  type="text"
                />
              </div>
              <div className={`form-group${(this.props.errorObj ? ' has-danger' : '')}`}>
                <label className="form-control-label" htmlFor="loginFormPassword">Password</label>
                <Field name="password" className="form-control" component="input" type="password" />
                {this.props.errorObj && (
                <div className="has-danger form-control-feedback">
                  Incorrect CFT number or password.
                </div>
                )}
              </div>
              <div className="text-xs-right">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorObj: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, { loginUser })(form(Login));
