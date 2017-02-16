import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { PageLoading } from '../shared';
import { fetchCertificateList } from '../courses/actions';
import { showModal } from '../modals';
import { addQualification } from './actions';
import QualificationDetailForm from './QualificationDetailForm';

const form = reduxForm({
  form: 'addQualification',
});

class AddQualification extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCertificateList();
  }

  handleFormSubmit(formProps) {
    // Send user ID instead of user object
    const data = {
      ...formProps,
      user: formProps.user.id,
    };
    this.props.addQualification(data)
    .then(() => {
      browserHistory.push(paths.VIEW_QUALIFICATIONS);
    });
  }

  render() {
    const { certificates, handleSubmit, profile, qualification, roles: { isAdmin } } = this.props;
    if (!(profile && certificates)) {
      return <PageLoading />;
    }
    return (
      <div>
        <h1 className="sinc-page-header d-flex justify-content-between">
          Add qualification
        </h1>
        <QualificationDetailForm
          addNew={true}
          certificates={certificates}
          editable={isAdmin}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        />
      </div>
    );
  }
}

AddQualification.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { certificates } = state.courses;
  const { profile } = state.profiles;
  return {
    certificates,
    profile,
  };
}

export default connect(mapStateToProps, {
  addQualification,
  fetchCertificateList,
})(form(AddQualification));
