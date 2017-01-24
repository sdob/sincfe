import React, { Component } from 'react';
import { connect } from 'react-redux';
import MemberTable from '../shared/MemberTable';

class ViewMembers extends Component {
  
  render() {
    return (
      <div>
        <h1 className="sinc-page-header">View members</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, {})(ViewMembers);
