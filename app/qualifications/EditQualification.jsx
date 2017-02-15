import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { PageLoading } from '../shared';
import { fetchCertificateList } from '../courses/actions';
import { fetchQualification, updateQualification } from './actions';
import QualificationDetailForm from './QualificationDetailForm';

const form = reduxForm({
  form: 'editQualification',
});

class EditQualification extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    const qid = this.context.router.params.id;
    this.props.fetchQualification(qid);
    this.props.fetchCertificateList();
  }

  handleFormSubmit(formProps) {
    const data = {
      ...formProps,
      user: formProps.user.id,
    };
    this.props.updateQualification(data);
  }

  render() {
    const { certificates, handleSubmit, isAdmin, profile, qualification } = this.props;
    if (!(profile && qualification)) {
      return <PageLoading />;
    }
    return (
      <div>
        <h1 className="sinc-page-header">View qualification</h1>
        <QualificationDetailForm
          certificates={certificates}
          qualification={qualification}
          editable={isAdmin}
          onSubmit={handleSubmit(this.handleFormSubmit)}
        />
      </div>
    );
  }
}

EditQualification.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { certificates } = state.courses;
  const { profile } = state.profiles;
  const { qualification } = state.qualifications;
  return {
    certificates,
    initialValues: formatQualification(qualification),
    profile,
    qualification,
  };

  function formatQualification(qualification) {
    if (qualification) {
      const formattedQualification = {
        ...qualification,
        certificate: qualification.certificate.id,
      };
      return formattedQualification;
    }
    return undefined;
  }
}

export default connect(mapStateToProps, {
  fetchCertificateList,
  fetchQualification,
  updateQualification,
})(form(EditQualification));
