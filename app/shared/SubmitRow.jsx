import React from 'react';
import InlineSpinner from './InlineSpinner';

export default function SubmitRow(props) {
  const { sending } = props;
  return (
    <div className="form-group row">
      <div className="col-md-9 col-lg-6 offset-md-3 sinc-form__submit-row">
        <button
          className="btn btn-primary"
          disabled={sending}
          type="submit"
        >
          {sending ? <InlineSpinner /> : 'Save'}
        </button>
      </div>
    </div>
  );
}
