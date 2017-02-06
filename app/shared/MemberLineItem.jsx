import React from 'react';

export default function MemberLineItem({ inline, member, onClick }) {
  const block = !inline;
  return (
    <div>
      <div className={`sinc-member-line-item__id${block ? ' block' : ''}`}>
        {member.id}
      </div>
      <div className="sinc-member-line-item__name">
        {member.first_name} {member.last_name}
      </div>
      <div className="sinc-member-line-item__button-container">
        <button
          className="sinc-member-line-item__button"
          onClick={onClick}
        >
          <i className="fa fa-fw fa-times" />
        </button>
      </div>
    </div>
  );
}
