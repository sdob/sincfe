import React from 'react';

export default function PageLoading() {
  return (
    <div className="sinc-page-loading text-xs-center">
      <p>
        <i className="fa fa-cog fa-spin fa-3x fa-fw" />
      </p>
      <p>
        Loading...
      </p>
    </div>
  );
}
