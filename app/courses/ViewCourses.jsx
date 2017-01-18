import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as paths from '../paths';
import PageLoading from '../shared/PageLoading';
import { fetchRegions } from '../regions/actions';
import { fetchCertificateList, fetchCourseList, hideRegion, showRegion } from './actions';

class ViewCourses extends Component {

  static handleCertificateSelect() {
  }

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

  handleRegionToggle(evt, region) {
    const shouldBeVisible = evt.target.checked;
    if (!shouldBeVisible) {
      this.props.hideRegion(region);
    } else {
      this.props.showRegion(region);
    }
  }

  render() {
    return (
      <div>
        <h1 className="sinc-page-header">View courses</h1>

        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by region
        </h2>
        <div className="row">
          { this.props.regions.regions ? (
            <div>
              {this.props.regions.regions.map((region, i) => (
                <div className="col-xs-6 col-md-3" key={i + 1}>
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
          Filter by course
        </h2>

        <div className="form-group row">
          <label htmlFor="certificate" className="col-sm-6 col-md-3 col-form-label">
            Course name
          </label>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <select
              name="certificate"
              className="form-control"
              onChange={evt => ViewCourses.handleCertificateSelect(evt)}
            >
              <option />
              {this.props.certificates && this.props.certificates.map((certificate, i) => (
                <option
                  value={certificate.id}
                  key={i + 1}
                >
                  {certificate.name}
                </option>
              ))}
            </select>
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
              {this.getVisibleCourses().map((c, i) => (
                <tr key={i + 1}>
                  <td>
                    <Link to={`${paths.VIEW_COURSES}/${c.id}`}>
                      {c.id}
                    </Link>
                  </td>
                  <td>{c.certificate.name}</td>
                  <td>{c.date || 'Open'}</td>
                  <td>{c.organizer.first_name} {c.organizer.last_name}</td>
                  <td>{c.region.name}</td>
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
