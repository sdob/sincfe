import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageError from '../shared/PageError';
import PageLoading from '../shared/PageLoading';
import NotImplementedYet from '../shared/NotImplementedYet';
import { fetchCurrentMembers } from './actions';

class SearchCurrentMembers extends Component {

  componentDidMount() {
    const { profile } = this.props;
    if (profile && profile.club) {
      this.props.fetchCurrentMembers(profile.club);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.props.fetchCurrentMembers(nextProps.profile.club);
    }
  }

  render() {
    const { error, profile, currentMembers } = this.props;
    if (error) {
      return (<PageError />);
    }
    if (!(profile && currentMembers.currentMembers)) {
      return (<PageLoading />);
    }
    return (
      <div>
        <h1 className="sinc-page-header">Search current members</h1>
        <NotImplementedYet />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
    currentMembers: state.currentMembers,
  };
}

export default connect(mapStateToProps, { fetchCurrentMembers })(SearchCurrentMembers);
