import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as sort from 'sortabular';

import * as paths from '../paths';
import { fetchQualifications } from './actions';
import { fetchClubList } from '../clubs/actions';
import { fetchRegions } from '../regions/actions';
import PageLoading from '../shared/PageLoading';
import SortedTable from '../shared/SortedTable';


class ViewQualifications extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    const getSortingColumns = this.getSortingColumns.bind(this);
    const columns = columnDefinitions.bind(this)(getSortingColumns);
    this.state = {
      columns,
      sortingColumns: {
        id: { direction: 'desc', position: 0 },
        first_name: { direction: 'desc', position: 1 },
        last_name: { direction: 'none', position: 2 },
      },
    };
  }

  componentDidMount() {
    const { fetchClubList, fetchQualifications, fetchRegions } = this.props;
    fetchRegions()
    .then(fetchClubList)
    .then(fetchQualifications);
  }

  getSortingColumns() {
    return this.state.sortingColumns || {};
  }

  render() {
    const { qualifications, regions } = this.props;
    if (!(qualifications && regions)) {
      return <PageLoading />;
    }

    const { columns, sortingColumns } = this.state;
    // Don't search on these columns; it's either not meaningful to do so
    const unsearchableProperties = ['id', 'user.club.region.name'];
    const searchingColumns = columns.filter(col => !unsearchableProperties.includes(col.property));
    return (
      <div>
        <h1 className="sinc-page-header">View qualifications</h1>
        <div className="row">
          <h2 className="sinc-section-header">
            Filter regions
          </h2>
          {regions.map(region => (
            <div className="col-xs-6 col-md-3" key={region.id}>
              <label>
                <input
                  type="checkbox"
                  defaultChecked
                />
                {region.name}
              </label>
            </div>
          ))}
        </div>
        <SortedTable
          columns={columns}
          rows={qualifications}
          searchingColumns={searchingColumns}
          sortingColumns={sortingColumns}
        />
      </div>
    );
  }
}

function columnDefinitions(getSortingColumns) {
  const strategy = sort.strategies.byProperty;

  const resetable = sort.reset({
    event: 'onDoubleClick',
    getSortingColumns,
    onReset: ({ sortingColumns }) => this.setState({ sortingColumns }),
    strategy,
  });

  const sortable = sort.sort({
    getSortingColumns,
    strategy,
    onSort: (selectedColumn) => {
      this.setState({
        sortingColumns: sort.byColumn({
          sortingColumns: this.state.sortingColumns,
          selectedColumn,
        }),
      });
    }
  });

  return [
    defaultColumn('user.id', 'CFT #'),
    defaultColumn('user.first_name', 'First name'),
    defaultColumn('user.last_name', 'Last name'),
    defaultColumn('certificate.name', 'Certification'),
    defaultColumn('user.club.name', 'Club'),
    defaultColumn('user.club.region.name', 'Region'),
    {
      property: 'id',
      header: { label: 'Action' },
      cell: {
        formatters: [
          id => (
            <Link to={`${paths.EDIT_QUALIFICATION}/${id}`}>
              <i className="fa fa-fw fa-edit" />
            </Link>),
          ],
      },
    },
  ];

  function defaultColumn(property, label, rest) {
    return {
      property,
      header: {
        label,
        transforms: [resetable],
        formatters: [
          sort.header({ getSortingColumns, sortable, strategy }),
        ],
      },
      ...rest,
    };
  }
}

function mapStateToProps(state) {
  return {
    clubs: state.clubs.clubs,
    qualifications: state.qualifications.qualifications,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, {
  fetchClubList,
  fetchQualifications,
  fetchRegions,
})(ViewQualifications);
