import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { DatePicker, PageLoading } from '../shared';
import { fetchRegionList } from '../regions';
import { fetchCertificateList } from './actions';
import { searchForMember } from '../profiles/actions';

const form = reduxForm({
  form: 'AddCourse',
});

class AddCourse extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleOrganizerChange = this.handleOrganizerChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchRegionList();
    this.props.fetchCertificateList();
  }

  handleOrganizerChange(evt) {
    // console.info(evt.target.value);
    const { value } = evt.target;
    this.props.searchForMember(value);
  }

  render() {
    const {certificates, regions } = this.props;
    if (!(regions && certificates)) {
      return <PageLoading />;
    }
    return (
      <form>
        <h1 className="sinc-page-header">
          Add course
        </h1>
        <div className="form-group row">
          <div className="col-xs-6 col-md-3 offset-lg-3">
            <label htmlFor="region">
              Region
            </label>
          </div>
          <div className="col-xs-6 col-lg-3">
            <select className="form-control" name="region">
              <option value="NaN">Select region</option>
              {regions.map(r => (
                <option value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6 col-md-3 offset-lg-3">
            <label htmlFor="certificate">
              Certification
            </label>
          </div>
          <div className="col-xs-6 col-lg-3">
            <select className="form-control" name="certificate">
              <option value="NaN">Select certification</option>
              {certificates.map(c => (
                <option value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6 col-md-3 offset-lg-3">
            <label htmlFor="date col-form-label">
              Date
            </label>
          </div>
          <div className="col-xs-6 col-lg-3">
            <Field name="date" component={DatePicker} />
          </div>
        </div>
        <div className="form-group row">
          <div className="col-xs-6 col-md-3 offset-lg-3">
            <label htmlFor="date col-form-label">
              Organizer
            </label>
          </div>
          <div className="col-xs-6">
            <input className="form-control" type="text" onChange={this.handleOrganizerChange} />
          </div>
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    certificates: state.courses.certificates,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, {
  fetchCertificateList,
  fetchRegionList,
  searchForMember,
})(form(AddCourse));
