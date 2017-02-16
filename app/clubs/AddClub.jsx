import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { fetchRegionList } from '../regions';
import { addClub } from './actions';

import ClubDetailForm from './ClubDetailForm';
import validate from './validate';

const form = reduxForm({
  form: 'addClub',
  validate,
});

class AddClub extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchRegionList();
  }

  handleFormSubmit(formProps) {
    console.info(formProps);
    return this.props.addClub(formProps);
  }

  render () {
    const { handleSubmit, roles: { isAdmin }, submitting } = this.props;
    return (
      <div>
        <h1 className="sinc-page-header">Add club</h1>
        <ClubDetailForm
          addNew={true}
          isAdmin={isAdmin}
          onSubmit={handleSubmit(this.handleFormSubmit)}
          submitting={submitting}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {
  addClub,
  fetchRegionList,
})(form(AddClub));
