import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PageLoading from '../shared/PageLoading';
import NotImplementedYet from '../shared/NotImplementedYet';
import { fetchClub } from './actions';
import { fetchRegions } from '../regions/actions';

const form = reduxForm({
  form: 'editClubDetails',
});

class ClubDetails extends Component {

  componentDidMount() {
    const { fetchClub, fetchRegions, profile } = this.props;
    console.info(fetchClub);
    if (profile && profile.club) {
      fetchClub(profile.club.id);
      fetchRegions();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchClub, fetchRegions, profile } = this.props;
    if (nextProps.profile !== profile) {
      fetchClub(nextProps.profile.club.id);
      fetchRegions();
    }
  }

  render() {
    const { club, profile, regions } = this.props;
    if (!(club && regions)) {
      return <PageLoading />;
    }

    console.info(regions);

    const region = regions.filter(region => region.id === club.region)[0];

    return (
      <div>
        <h1 className="sinc-page-header">Club details ({club.name})</h1>
        <div className="form-group row">
          <label className="col-xs-6 col-md-3 col-form-label">
            Club name
          </label>
          <div className="col-xs-6 col-md-9">
            <p className="form-control-static">
              {club.name}
            </p>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-6 col-md-3 col-form-label">
            Region
          </label>
          <div className="col-xs-6 col-md-9">
            <p className="form-control-static">
              {region.name}
            </p>
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-12 col-md-3 col-form-label">
            Description
          </label>
          <div className="col-xs-12 col-md-9">
            <textarea className="form-control" rows="3" />
          </div>
        </div>

        <div className="form-group row">
          <label className="col-xs-12 col-md-3 col-form-label">
            Contact name
          </label>
          <div className="col-xs-12 col-md-9">
            <Field name='contactName' component="input" className="form-control" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    club: state.clubs.club,
    profile: state.profiles.profile,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, { fetchClub, fetchRegions })(form(ClubDetails));
