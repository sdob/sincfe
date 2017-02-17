import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import Autosuggest from 'react-autosuggest';
import debounce from 'lodash/debounce';

import * as paths from '../paths';
import { DateTimePicker, MemberLineItem, PageLoading, SelectRow, SubmitRow } from '../shared';
import { fetchRegionList } from '../regions';
import { addCourse, fetchCertificateList } from './actions';
import { searchForMember } from '../profiles/actions';
import * as fields from './fields';
import validate from './validate';
import CourseDetailForm from './CourseDetailForm';

const form = reduxForm({
  form: 'addCourse',
  validate,
});

const instructorInputId = 'js-autosuggest-instructor';
const organizerInputId = 'js-autosuggest-organizer';

class AddCourse extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    // Fetch the list of regions and certificates from the API
    this.props.fetchRegionList();
    this.props.fetchCertificateList();
  }

  componentWillReceiveProps(nextProps) {
    // If we've received a 'course' object, it means that we've successfully added
    // a course.
    const { added } = nextProps;
    if (added) {
      this.context.router.push(paths.VIEW_COURSES);
    }
  }

  handleFormSubmit(formProps) {
    return this.props.addCourse(formProps)
    .then(() => browserHistory.goBack());
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <h1 className="sinc-page-header">Add course</h1>
        <CourseDetailForm onSubmit={handleSubmit(this.handleFormSubmit)} {...this.props} />
      </div>
    );
  }
}

AddCourse.contextTypes = {
  router: React.PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    certificates: state.courses.certificates,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, {
  addCourse,
  fetchCertificateList,
  fetchRegionList,
  searchForMember,
})(form(AddCourse));
