import React from 'react';

function ContactUs() {
  return (
    <div>
      <h1 className="sinc-page-header">
        Contact us
      </h1>
      <h2 className="sinc-section-header sinc-section-header--minor">
        Headquarters
      </h2>
      <p>
        The headquarters of the Irish Underwater Council
        are located at 78A Patrick Street, Dun Laoghaire.
        The office has recently been refurbished and is
        a great asset to the organisation.
      </p>
      <p>
        The office is open to members and the public
        on Monday to Friday, 10.00 – 17.00.
      </p>
      <h2 className="sinc-section-header sinc-section-header--minor">
        General Enquiries
      </h2>
      <ul>
        <li>
          <a href="mailto:info@cft.ie">info@cft.ie</a>
        </li>
        <li>
          Phone: +353 1 2844601
        </li>
        <li>
          Fax: +353 1 2844602
        </li>
      </ul>
      <h2 className="sinc-section-header sinc-section-header--minor">
        Membership enquiries
      </h2>
      <p>
        You can email your query at any time
        to <a href="mailto:membership@cft.ie">membership@cft.ie</a>.
      </p>
      <h2 className="sinc-section-header sinc-section-header--minor">
        Cert enquiries
      </h2>
      <p>
        You can email your cert query / application at any time
        to <a href="mailto:certs@cft.ie">certs@cft.ie</a>.
      </p>
    </div>
  );
}

export default ContactUs;
