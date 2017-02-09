import React from 'react';

export default function MemberLineItem({ label, member, onClick }) {
  return (
    <div className="form-group row">
      <div className="col-12 col-md-2">
        {label}
      </div>
      <div className="sinc-member-line-item__id">
        {member.id}
      </div>
      <div className="sinc-member-line-item__name">
        {member.first_name} {member.last_name}
      </div>
      <div className="sinc-member-line-item__button-container">
        <button
          className="sinc-member-line-item__button"
          onClick={onClick}
          type="button"
        >
          <i className="fa fa-fw fa-times" />
        </button>
      </div>
    </div>
  );
}
