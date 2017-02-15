import React from 'react';
import { Link } from 'react-router';

export default function AddLink(props) {
  const { to } = props;
  return (
    <Link to={to}>
      <span className="btn btn-primary">
        <i className="fa fa-fw fa-file" />
      </span>
    </Link>
  );
}
