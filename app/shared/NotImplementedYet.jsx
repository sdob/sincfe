import React from 'react';

/*
 * A presentational component that just lets the user know that the
 * functionality they're expecting hasn't been implemented yet.
 */
export default function NotImplementedYet() {
  return (
    <div className="sinc-not-implemented-yet text-xs-center">
      <p>
        <span className="fa fa-stack fa-2x">
          <i className="fa fa-code fa-stack-1x" />
          <i className="fa fa-ban fa-stack-2x" />
        </span>
      </p>
      <p>
        This part of SINC isn&apos;t implemented yet. Sorry!
      </p>
    </div>
  );
}
