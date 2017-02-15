import React from 'react';

export default function DeleteButton(props) {
  const { onClick } = props;
  return (
    <button
      className="btn btn-danger sinc-btn--compact"
      onClick={onClick}
      type="button"
    >
      <i className="fa fa-fw fa-trash" />
    </button>
  );
}
