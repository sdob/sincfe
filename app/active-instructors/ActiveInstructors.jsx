import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import orderBy from 'lodash/orderBy';
import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import * as sort from 'sortabular';

import fetchActiveInstructors from './actions';
import PageLoading from '../shared/PageLoading';


class ActiveInstructors extends Component {
  componentDidMount() {
    const { profile } = this.props;
    if (profile) {
      this.props.fetchActiveInstructors(profile.club.region.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile !== this.props.profile) {
      this.props.fetchActiveInstructors(nextProps.profile.club.region.id);
    }
  }

  constructor(props) {
    super(props);

    const getSortingColumns = () => this.state.sortingColumns || {};

    const resetable = sort.reset({
      event: 'onDoubleClick',
      getSortingColumns,
      onReset: ({ sortingColumns }) => this.setState({ sortingColumns }),
      strategy: sort.strategies.byProperty,
    });

    const sortable = sort.sort({
      getSortingColumns,

      onSort: selectedColumn => {
        this.setState({
          sortingColumns: sort.byColumn({
            sortingColumns: this.state.sortingColumns,
            selectedColumn
          }),
        });
      },

      strategy: sort.strategies.byProperty,
    });

    this.state = {
      sortingColumns: {
        'id': {
          direction: 'asc',
          position: 0,
        },
        'first_name': {
          direction: 'none',
          position: 1,
        },
        'last_name': {
          direction: 'none',
          position: 2,
        },
      },

      columns: [
        {
          property: 'id',
          header: {
            label: 'CFT number',
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty,
              }),
            ],
          },
        },
        {
          property: 'first_name',
          header: {
            label: 'First name',
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty,
              }),
            ],
          },
        },
        {
          property: 'last_name',
          header: {
            label: 'Last name',
            transforms: [resetable],
            formatters: [
              sort.header({
                sortable,
                getSortingColumns,
                strategy: sort.strategies.byProperty,
              }),
            ],
          },
        },
      ],
    };

  }

  render() {
    const { instructors, profile } = this.props;
    if (!instructors) {
      return <PageLoading />;
    }
    // TODO: Set this to the appropriate scope (club, region, etc.)
    const scope = profile.club.region.name;


    const rows = instructors;

    const { columns, sortingColumns } = this.state;
    const resolvedColumns = resolve.columnChildren({ columns });

    const sortedRows = compose(
      sort.sorter({
        columns: resolvedColumns,
        sortingColumns,
        sort: orderBy,
        strategy: sort.strategies.byProperty,
      }),
      resolve.resolve({
        columns: resolvedColumns,
        method: resolve.nested,
      })
    )(rows);

    return (
      <div>
        <h1>Active Instructors ({scope})</h1>
        <Table.Provider
          className="table pure-table pure-table-striped"
          columns={columns}
        >
          <Table.Header
            headerRows={resolve.headerRows({ columns })}
          />
          <Table.Body rows={sortedRows} rowKey="id" />
        </Table.Provider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    instructors: state.activeInstructors.instructors,
    profile: state.profiles.profile,
  };
}

export default connect(mapStateToProps, { fetchActiveInstructors })(ActiveInstructors);
