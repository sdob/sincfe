import React from 'react';

/*
 * A little spinner to let the user know that we're waiting for something to happen
 * (probably a response from the server)
 */
export default function PageLoading(props) {
  return (
    <div className="sinc-page-loading text-xs-center">
      <p>
        <i className="fa fa-cog fa-spin fa-3x fa-fw" />
      </p>
      <p>
        {props.message || 'Loading...'}
      </p>
    </div>
  );
}
