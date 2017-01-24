import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as sort from 'sortabular';

import * as paths from '../paths';
import { fetchQualifications } from './actions';
import { fetchClubList } from '../clubs/actions';
import { fetchCertificateList } from '../courses/actions';
import { fetchRegions } from '../regions/actions';
import CertificateSelector from '../shared/CertificateSelector';
import PageLoading from '../shared/PageLoading';
import SortedTable from '../shared/SortedTable';


class ViewQualifications extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleRegionToggle = this.handleRegionToggle.bind(this);
    const getSortingColumns = this.getSortingColumns.bind(this);
    const columns = columnDefinitions.bind(this)(getSortingColumns);
    this.state = {
      columns,
      regionVisibilities: {},
      sortingColumns: {
        id: { direction: 'desc', position: 0 },
        first_name: { direction: 'desc', position: 1 },
        last_name: { direction: 'none', position: 2 },
      },
    };
  }

  componentDidMount() {
    // If we already have regions in state (e.g., from another component),
    // then initialize the region visibilities immediately
    if (this.props.regions) {
      this.initializeVisibilities(this.props.regions);
    }
    // Get the list of all certificate types in the system (this will populate
    // the filter dropdown)
    this.props.fetchCertificateList();
    // Get the list of regions, then clubs, then qualifications
    this.props.fetchRegions()
    .then(this.props.fetchClubList)
    .then(this.props.fetchQualifications);
  }

  componentWillReceiveProps(nextProps) {
    // If we're receiving the list of regions, create a visibilities object
    // that will hold the visibility toggles
    if (nextProps.regions !== this.props.regions) {
      const { regions } = nextProps;
      this.initializeVisibilities(regions);
    }
  }

  getSortingColumns() {
    return this.state.sortingColumns || {};
  }

  getVisibleQualifications() {
    // Filter the list of qualifications, returning only those qualifications
    // that either have no region set or whose region is toggled to be
    // visible.
    const { qualifications } = this.props;
    const { regionVisibilities } = this.state;
    const { selectedCertificateId } = this.state;
    return qualifications.filter(isWithinVisibleRegion).filter(isSelectedCertificate);

    function isSelectedCertificate(qual) {
      return selectedCertificateId === undefined || selectedCertificateId === '' + qual.certificate.id;
    }

    function isWithinVisibleRegion(q) {
      return !(q.user && q.user.club && q.user.club.region) || regionVisibilities[q.user.club.region.id];
    }
  }

  handleCertificateSelect(evt) {
    const { certificates } = this.props;
    const value = evt.target.value;
    // Check whether the value is represented in the list of certificates;
    // if not, then all certs should be visible
    const matchingCertificates = certificates.filter(cert => ('' + cert.id) === value);
    if (matchingCertificates.length) {
      this.setState({ selectedCertificateId: value });
    } else {
      this.setState({ selectedCertificateId: undefined });
    }
  }

  handleRegionToggle(rid, visibility) {
    // When a change to one of the filter checkboxes occurs, update the
    // visibility for that region
    this.setState({ regionVisibilities: { ...this.state.regionVisibilities, [rid]: visibility } });
  }

  initializeVisibilities(regions) {
    const visibilities = {};
    regions.forEach((region) => {
      visibilities[region.id] = true;
    });
    this.setState({ regionVisibilities: visibilities });
  }

  render() {
    const { certificates, qualifications, regions } = this.props;
    if (!(qualifications && regions)) {
      return <PageLoading />;
    }

    const { columns, sortingColumns } = this.state;
    // Don't search on these columns; it's either not meaningful to do so
    const unsearchableProperties = ['id', 'user.club.region.name', 'certificate.name'];
    const searchingColumns = columns.filter(col => !unsearchableProperties.includes(col.property));
    return (
      <div>
        <h1 className="sinc-page-header">View qualifications</h1>
        <div className="row">
          <h2 className="sinc-section-header sinc-section-header--minor">
            Filter by region
          </h2>
          {regions.map(region => (
            <div className="col-xs-6 col-md-3" key={region.id}>
              <label htmlFor={`toggle-region-${region.id}`}>
                <input
                  type="checkbox"
                  defaultChecked
                  name={`toggle-region-${region.id}`}
                  onChange={event => this.handleRegionToggle(region.id, event.target.checked)}
                />
                {region.name}
              </label>
            </div>
          ))}
        </div>
        <div className="row">
          <h2 className="sinc-section-header sinc-section-header--minor">
            Filter by course
          </h2>
        </div>
        <div className="form-group row">
          <label htmlFor="certificate" className="col-sm-6 col-md-3 col-form-label">
            Course name
          </label>
          <CertificateSelector
            className="col-sm-6 col-md-4 col-lg-3"
            onChange={this.handleCertificateSelect.bind(this)}
            certificates={certificates}
          />
        </div>
        <div className="row">
          <h2 className="sinc-section-header">
            Results
          </h2>
        </div>
        <SortedTable
          columns={columns}
          rows={this.getVisibleQualifications()}
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
    defaultColumn('user.club.name', 'Club'),
    defaultColumn('certificate.name', 'Certification'),
    defaultColumn('user.club.region.name', 'Region'),
    {
      property: 'id',
      header: { label: 'Action' },
      cell: {
        formatters: [
          id => (
            <Link to={`${paths.EDIT_QUALIFICATION}/${id}`}>
              <i className="fa fa-fw fa-edit" />
            </Link>
          ),
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
    certificates: state.courses.certificates,
    qualifications: state.qualifications.qualifications,
    regions: state.regions.regions,
  };
}

export default connect(mapStateToProps, {
  fetchCertificateList,
  fetchClubList,
  fetchQualifications,
  fetchRegions,
})(ViewQualifications);
