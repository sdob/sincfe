import React from 'react';
import { Link } from 'react-router';
import * as paths from '../paths';

export default function HelpPage() {
  return (
    <div>
      <h1 className="sinc-page-header">Frequently asked questions</h1>
      <h2 className="sinc-section-header sinc-faq-header">
        How do I submit my annual medical disclaimer?
      </h2>
      <p>
        Under Member Options, click on
        <Link to={paths.MEDICAL_DISCLAIMER}>
          <i className="fa fa-fw fa-heartbeat" />
          Annual Medical Disclaimer
        </Link>.
        Then fill in the details as requested.
        Once you have answered all the questions confirm this information and Submit your form
        to the Medical Officer.
      </p>
      <p>
        If you answer &quot;no&quot; to all the medical questions then you will be automatically
        passed.
        If you answer yes to some of the questions then your status will be pending until the
        form has been signed off by the Medical Officer.
        The Officer may request more information from you.
      </p>
      <h2 className="sinc-section-header sinc-faq-header">
        How often do I have to fill in the form?
      </h2>
      <p>
        This form will need to be filled out once a year if you wish to be able to dive.
        You will be notified when it needs renewing.
      </p>

      <h2 className="sinc-section-header sinc-faq-header">
        How do I know what my current membership status is?
      </h2>

      <p>
        Under Member Options click on <Link to={paths.MEMBERSHIP_HISTORY}>
          <i className="fa fa-fw fa-clock-o" />
          Membership History
        </Link>. Here you will find all the information pertaining to your membership.
      </p>
      <p>
        Your status will be:
      </p>
      <ol>
        <li>Current - fully qualified Diver or Snorkeler</li>
        <li>Pending - your membership is currently pending, awaiting
          completion of either payment or medical forms and fitness test.</li>
        <li>Lapsed - your renewal request and payment has not been received
          after the January deadline. You can still renew at any point, so please
          contact your local Diver Officer or Club Secretary for details.</li>
        <li>Past - you have not renewed your membership for over 12 months.</li>
      </ol>

      <h2 className="sinc-section-header sinc-faq-header">
        When is my next medical or water fitness due?
      </h2>
      <p>
        Under Member Options click on <Link to={paths.MEMBERSHIP_HISTORY}>
          <i className="fa fa-fw fa-clock-o" />
          Membership history
        </Link>. Here you will find all the information pertaining to your membership.
      </p>
    </div>
  );
}
