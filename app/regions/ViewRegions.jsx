import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { GenericErrorMessage, PageLoading } from '../shared';
import * as paths from '../paths';

import { fetchRegions } from './actions';

class ViewRegions extends Component {
  componentDidMount() {
    this.props.fetchRegions();
  }

  render() {
    const { errorMsg, regions } = this.props;

    if (errorMsg) {
      return <GenericErrorMessage error={errorMsg} />;
    }

    if (!regions) {
      return <PageLoading />;
    }

    return (
      <div>
        <h1 className="sinc-page-header">View regions</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {regions.map(region => (
              <tr>
                <td>
                  {region.name}
                </td>
                <td>
                  <Link
                    className="btn btn-primary sinc-btn--compact"
                    to={`${paths.EDIT_REGION}/${region.id}`}
                  >
                    <i className="fa fa-fw fa-edit" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMsg: state.regions.error,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, { fetchRegions })(ViewRegions);
