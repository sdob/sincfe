import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchActiveInstructors from './actions';
import PageLoading from '../shared/PageLoading';

class ActiveInstructors extends Component {
  componentDidMount() {
    console.info('ActiveInstructors mounted');
    const { profile } = this.props;
    if (profile) {
      console.info('profile loaded');
      this.props.fetchActiveInstructors();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile != this.props.profile) {
      this.props.fetchActiveInstructors();
    }
  }

  render() {
    const { instructors } = this.props;
    if (!instructors) {
      return <PageLoading />;
    }

    return (
      <div>
        Page loaded!;
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.auth.profile,
  };
}

export default connect(mapStateToProps, { fetchActiveInstructors })(ActiveInstructors);
