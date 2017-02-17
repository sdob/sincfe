import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';

import * as paths from '../paths';
import { CertificateSelector, PageLoading, RegionFilter } from '../shared';
import { fetchRegions } from '../regions/actions';
import { deleteCourse, fetchCertificateList, fetchCourseList } from './actions';
import { showModal } from '../modals/actions';

import CourseTable from './CourseTable';

class ViewCourses extends Component {

  constructor(props) {
    super(props);
    this.handleCertificateSelect = this.handleCertificateSelect.bind(this);
    this.handleRegionToggle = this.handleRegionToggle.bind(this);
    this.handleCourseDelete = this.handleCourseDelete.bind(this);
    this.state = {
      regionVisibilities: {},
    };
  }

  componentDidMount() {
    // We need to grab the regions from the API server
    this.props.fetchRegions();
    // We also need the courses
    this.props.fetchCourseList();
    // And we need the certificate types!
    this.props.fetchCertificateList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.regions !== this.props.regions) {
      const { regions } = nextProps;
      this.initializeRegionVisibilities(regions);
    }
  }

  getVisibleCourses() {
    const { courses } = this.props;
    const { regionVisibilities, selectedCertificateId } = this.state;
    return courses.filter(isWithinVisibleRegion).filter(isSelectedCertificate);

    function isWithinVisibleRegion(course) {
      const courseRegionIsDefined = course && course.region && course.region.id;
      return !courseRegionIsDefined || regionVisibilities[course.region.id];
    }

    function isSelectedCertificate(course) {
      const noSelectedCertificate = selectedCertificateId === undefined;
      const courseCertificateIsSelected = Number(selectedCertificateId) === course.certificate.id;
      return noSelectedCertificate || courseCertificateIsSelected;
    }
  }

  handleCertificateSelect(evt) {
    const { certificates } = this.props;
    const { target: { value } } = evt;
    // If this value (cast to a Number) isn't present in the list of certificates, then it's garbage
    if (!certificates.map(c => c.id).includes(Number(value))) {
      return this.setState({ selectedCertificateId: undefined });
    }
    return this.setState({ selectedCertificateId: Number(value) });
  }

  handleCourseDelete(cid) {
    console.info('handling course delete');
    this.props.showModal({
      modalType: 'DELETE_COURSE',
      modalProps: {
        courseId: cid,
      },
    });
  }

  handleRegionToggle(rid, visibility) {
    this.setState({ regionVisibilities: { ...this.state.regionVisibilities, [rid]: visibility } });
  }

  initializeRegionVisibilities(regions) {
    const visibilities = {};
    regions.forEach((r) => {
      visibilities[r.id] = true;
    });
    this.setState({ regionVisibilities: visibilities });
  }

  render() {
    const { certificates, courses, regions } = this.props;
    if (!courses) {
      return <PageLoading />
    }
    return (
      <div>
        <h1 className="sinc-page-header d-flex justify-content-between">
          View courses
          {' '}
          <Link to={paths.ADD_COURSE}>
            <span className="btn btn-primary">
              <i className="fa fa-fw fa-file" />
            </span>
          </Link>
        </h1>

        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by region
        </h2>
        {regions && regions.length ? (
          <RegionFilter regions={regions} onChange={this.handleRegionToggle} />
        ) : (
          <PageLoading />
        )}

        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by certification
        </h2>
        <div className="form-group row">
          <label htmlFor="certificate" className="col-sm-6 col-md-3 col-form-label">
            Certification
          </label>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <CertificateSelector
              certificates={certificates}
              onChange={this.handleCertificateSelect}
            />
          </div>
        </div>

        <h2 className="sinc-section-header sinc-section-header-minor">
          Results
        </h2>
        <CourseTable rows={this.getVisibleCourses()} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    certificates: state.courses.certificates,
    courses: state.courses.courses,
    profile: state.profiles.profile,
    regions: state.regions.regions,
    hiddenRegions: state.courses.hiddenRegions,
  };
}

const actionList = {
  deleteCourse,
  fetchCertificateList,
  fetchCourseList,
  fetchRegions,
  showModal,
};

export default connect(mapStateToProps, actionList)(ViewCourses);
