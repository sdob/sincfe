import React, { Component } from 'react';
import { connect } from 'react-redux';

import PageLoading from '../shared/PageLoading';
import fetchRegions from '../regions/actions';
import fetchCourses from './actions';

class ViewCourses extends Component {

  componentDidMount() {
    // We need to grab the regions from the API server
    this.props.fetchRegions();
    // We also need the courses
    this.props.fetchCourses();
  }

  componentWillReceiveProps(nextProps) {
    console.info('viewcourses gets props');
    console.info(nextProps);
  }

  render() {
    return (
      <div>
        <h1 className="sinc-page-header">View courses</h1>

        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by area
        </h2>

        <div className="row">
          { this.props.regions.regions ? (
            <div>
              {this.props.regions.regions.map((x, i) => (
                <div className="col-xs-4 col-md-3" key={i + 1}>
                  <div className="checkbox">
                    <label htmlFor={`region-${x.id}`}>
                      <input name={`region-${x.id}`} type="checkbox" defaultChecked /> {x.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : <PageLoading /> }
        </div>

        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by name
        </h2>

        {this.props.courses.courses ? (
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
              {this.props.courses.courses.map((c, i) => (
                <tr key={i + 1}>
                  <td>{c.id}</td>
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
    courses: state.courses,
    profile: state.auth.profile,
    regions: state.regions,
  };
}

export default connect(mapStateToProps, { fetchCourses, fetchRegions })(ViewCourses);
