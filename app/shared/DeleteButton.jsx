import React from 'react';

export default function DeleteButton(props) {
  const { compact, onClick } = props;
  // compact defaults to true
  const isCompact = compact === undefined ? true : compact;
  return (
    <button
      className={`btn btn-danger ${isCompact ? 'sinc-btn--compact' : ''}`}
      onClick={onClick}
      type="button"
    >
      <i className="fa fa-fw fa-trash" />
    </button>
  );
}
