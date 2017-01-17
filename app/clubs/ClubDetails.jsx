import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageLoading from '../shared/PageLoading';
import NotImplementedYet from '../shared/NotImplementedYet';
import { fetchClub } from './actions';

class ClubDetails extends Component {

  componentDidMount() {
    const { fetchClub, profile } = this.props;
    console.info(fetchClub);
    if (profile && profile.club) {
      fetchClub(profile.club.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fetchClub, profile } = this.props;
    if (nextProps.profile !== profile) {
      fetchClub(nextProps.profile.club.id);
    }
  }

  render() {
    const { club, profile } = this.props;
    if (!club) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header">Club details ({club.name})</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    club: state.clubs.club,
    profile: state.profiles.profile,
  };
}

export default connect(mapStateToProps, { fetchClub })(ClubDetails);
