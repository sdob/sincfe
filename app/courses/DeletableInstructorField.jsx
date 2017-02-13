import React from 'react';

export default function DeletableInstructorField(props) {
  const { instruction: { user }, onClick } = props;

  return (
    <div className="form-group row">
      <div className="col-1 offset-md-2 text-right form-control-static"> {user.id} </div>
      <div className="col-8 col-sm-8 col-md-7 col-lg-4 form-control-static">
        {user.first_name} {user.last_name}
      </div>
      <div className="col-3 col-sm-3 col-md-2 text-right">
        <button
          type="button"
          className="btn btn-danger"
          onClick={onClick}
        >
          <i className="fa fa-fw fa-times" />
        </button>
      </div>
    </div>
  );
}
