import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotImplementedYet from '../shared/NotImplementedYet';

class TeachCourses extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1 className="sinc-page-header">Teach courses</h1>
        <NotImplementedYet />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
  };
}

export default connect(mapStateToProps)(TeachCourses);
