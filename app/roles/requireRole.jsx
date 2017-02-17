import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDisplayName } from '../shared';
import withRoleProps from './withRoleProps';

export default function requireRole(role) {
  return function (WrappedComponent) {
    class RequireRole extends Component {
      componentDidMount() {
        const { profile } = this.props;
        this.checkRoleAndMaybeRedirect(profile);
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.profile !== this.props.profile) {
          const { profile } = nextProps;
          this.checkRoleAndMaybeRedirect(profile);
        }
      }

      checkRoleAndMaybeRedirect(profile) {
        if (profile && !role.isHeldBy(profile)) {
          this.context.router.push('/');
        }
      }

      render() {
        console.info('rendering requireRole');
        if (!this.props.profile) {
          console.info('no profile');
          return null;
        }
        return <WrappedComponent {...this.props} />
      }
    }

    RequireRole.contextTypes = {
      router: React.PropTypes.object.isRequired,
    };

    RequireRole.displayName = `RequireRole(${getDisplayName(WrappedComponent)})`;

    function mapStateToProps(state) {
      const { profile } = state.profiles;
      return { profile };
    }

    return connect(mapStateToProps)(withRoleProps(RequireRole));
  }
}
