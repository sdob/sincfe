import React from 'react';

import Login from '../auth/Login';
import ForgotPasswordForm from '../auth/ForgotPassword';

function LoginPage() {
  return (
    <div>
      <div className="col-sm-5 col-md-4 col-lg-3">
        <div className="sinc-sidebar">
          <Login />
          <ForgotPasswordForm />
        </div>
      </div>
      <div className="col-sm-7 col-md-8 col-lg-9">
        <h1>Welcome</h1>
        {/* <img src="/img/login_image.jpg" className="float-right" /> */}
        <p>
          Welcome to the Irish Underwater Council (IUC) members&apos; login page.
        </p>
        <p>
          This page is for IUC members only. If you are not a member of CFT
          and are looking for information on joining a club near you,
          contact us at <a href="mailto:info@diving.ie">info@diving.ie</a> or browse our site.
        </p>
        <p>
          Members: if you have any questions regarding this facility, please
          contact Head Office on 01-2844601 or
          email <a href="system@diving.ie">system@diving.ie</a>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
