import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotImplementedYet from '../shared/NotImplementedYet';
import { fetchClubList } from './actions';

class ViewClubs extends Component {
  componentDidMount() {
    this.props.fetchClubList();
  }

  render() {
    return (
      <div>
        <h1 className="sinc-page-header">View clubs</h1>
        <NotImplementedYet />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clubs: state.clubs.clubList,
  };
}

export default connect(mapStateToProps, { fetchClubList })(ViewClubs);
