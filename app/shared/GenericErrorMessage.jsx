import React from 'react';

export default function GenericErrorMessage(props) {
  const { error } = props;
  console.info(error);

  return (
    <div className="text-xs-center">
      <p>
        <i className="fa fa-warning fa-3x fa-fw" />
      </p>
      <p>
        Oh no! Something went wrong.
      </p>
      <div>
        {error.message && (
          <p>
            Herei&rsquo;s what we know: <br />
            {error.message}
            </p>
        )}
      </div>
      <p>
        Try reloading the page or contacting support.
      </p>
    </div>
  );
}
