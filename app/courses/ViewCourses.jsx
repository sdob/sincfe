import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as paths from '../paths';
import { CertificateSelector, PageLoading } from '../shared';
import { fetchRegions } from '../regions/actions';
import { fetchCertificateList, fetchCourseList, hideRegion, showRegion } from './actions';

class ViewCourses extends Component {


  constructor(props) {
    super(props);
    this.handleCertificateSelect = this.handleCertificateSelect.bind(this);
    this.handleRegionToggle = this.handleRegionToggle.bind(this);
  }

  componentDidMount() {
    // We need to grab the regions from the API server
    this.props.fetchRegions();
    // We also need the courses
    this.props.fetchCourseList();
    // And we need the certificate types!
    this.props.fetchCertificateList();
  }

  getVisibleCourses() {
    const { courses, hiddenRegions } = this.props;
    const visibleCourses = courses.filter(course => !hiddenRegions.includes(course.region.id));
    return visibleCourses;
  }

  /* eslint-disable class-methods-use-this */
  handleCertificateSelect() {
    // TODO: handle filtering on course
  }
  /* eslint-enable class-methods-use-this */

  handleRegionToggle(evt, region) {
    const shouldBeVisible = evt.target.checked;
    if (!shouldBeVisible) {
      this.props.hideRegion(region);
    } else {
      this.props.showRegion(region);
    }
  }

  render() {
    const { certificates } = this.props;
    return (
      <div>
        <h1 className="sinc-page-header">View courses</h1>

        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by region
        </h2>
        <div className="row">
          { this.props.regions.regions ? (
            <div>
              {this.props.regions.regions.map(region => (
                <div className="col-xs-6 col-md-3" key={region.id}>
                  <div className="checkbox">
                    <label htmlFor={`region-${region.id}`}>
                      <input
                        name={`region-${region.id}`}
                        type="checkbox"
                        defaultChecked
                        onChange={evt => this.handleRegionToggle(evt, region)}
                      />
                      {region.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : <PageLoading /> }
        </div>

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
        {this.props.courses ? (
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Date</th>
                <th>Organizer</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {this.getVisibleCourses().map(course => (
                <tr key={course.id}>
                  <td>
                    <Link to={`${paths.VIEW_COURSES}/${course.id}`}>
                      {course.id}
                    </Link>
                  </td>
                  <td>{course.certificate.name}</td>
                  <td>{course.date || 'Open'}</td>
                  <td>{course.organizer.first_name} {course.organizer.last_name}</td>
                  <td>{course.region.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
         ) : <PageLoading />}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    certificates: state.courses.certificates,
    courses: state.courses.courses,
    profile: state.profiles.profile,
    regions: state.regions,
    hiddenRegions: state.courses.hiddenRegions,
  };
}

const actionList = {
  fetchCertificateList,
  fetchCourseList,
  fetchRegions,
  hideRegion,
  showRegion,
};

export default connect(mapStateToProps, actionList)(ViewCourses);
