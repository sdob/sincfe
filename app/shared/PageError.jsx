import React from 'react';

/*
 * Let the user know that there's been a problem that they can't do anything
 * to fix.
 */
export default function PageError() {
  return (
    <div className="sinc-page-error text-xs-center">
      <i className="fa fa-2x fa-frown-o" />
      <p>
        Oh no! Something went wrong. Try reloading the page.
      </p>
    </div>
  );
}
