import React from 'react';
import { Field, reduxForm } from 'redux-form';

function ForgotPassword(props) {
  const { handleSubmit } = props;
  return (
    <div className="sinc-sidebar__section">
      <div className="sinc-sidebar__header">
        <h2>Forgot your password?</h2>
      </div>
      <div className="sinc-sidebar__menu">
        <div className="sinc-sidebar__content">
          <p>
            No problem; just enter your CFT number and we&quot;ll
            email you to help you reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="forgotPasswordCftNumber">CFT number</label>
              <Field
                id="forgotPasswordCftNumber"
                name="cftNumber"
                className="form-control"
                component="input"
                type="text"
              />
            </div>
          </form>
          <div className="text-xs-right">
            <button className="btn btn-primary">
              Reset password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default reduxForm({
  form: 'forgotPassword',
})(ForgotPassword);
