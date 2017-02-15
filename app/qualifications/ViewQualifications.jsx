import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as sort from 'sortabular';
import moment from 'moment';

import * as paths from '../paths';
import { fetchQualifications } from './actions';
import { fetchClubList } from '../clubs/actions';
import { fetchCertificateList } from '../courses/actions';
import { fetchRegions } from '../regions/actions';
import { CertificateSelector, DeleteButton, PageLoading, RegionFilter, SortedTable } from '../shared';

class ViewQualifications extends Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.handleRegionToggle = this.handleRegionToggle.bind(this);
    this.handleCertificateSelect = this.handleCertificateSelect.bind(this);
    this.handleQualificationDelete = this.handleQualificationDelete.bind(this);
    this.getSortingColumns = this.getSortingColumns.bind(this);

    this.columnDefinitions = columnDefinitions.bind(this);

    // Set initial state
    // const columns = columnDefinitions.bind(this)(this.getSortingColumns, props.isAdmin);
    this.state = {
      regionVisibilities: {},
      sortingColumns: {
        date_granted: { direction: 'desc', position: 0 },
        first_name: { direction: 'desc', position: 1 },
        last_name: { direction: 'none', position: 2 },
      },
    };
    this.refreshColumnDefinitions(props.isAdmin);
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

    this.refreshColumnDefinitions(this.props.isAdmin);
  }

  componentWillReceiveProps(nextProps) {
    // If we're receiving the list of regions, create a visibilities object
    // that will hold the visibility toggles
    if (nextProps.regions !== this.props.regions) {
      const { regions } = nextProps;
      this.initializeVisibilities(regions);
    }
    if (nextProps.isAdmin !== this.props.isAdmin) {
      this.refreshColumnDefinitions(nextProps.isAdmin);
    }
  }

  refreshColumnDefinitions(isAdmin) {
    this.setState({
      columns: columnDefinitions(
        this.getSortingColumns.bind(this),
        isAdmin,
        this.handleQualificationDelete,
      ),
    });
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
      const noSelectedCertificate = selectedCertificateId === undefined;
      const qualCertIsSelected = Number(selectedCertificateId) === qual.certificate.id;
      return noSelectedCertificate || qualCertIsSelected;
    }

    function isWithinVisibleRegion(q) {
      const userRegionIsDefined = q.user && q.user.club && q.user.club.region;
      const regionIsVisible = regionVisibilities[q.user.club.region.id];
      return !userRegionIsDefined || regionIsVisible;
    }
  }

  handleCertificateSelect(evt) {
    const { certificates } = this.props;
    const value = evt.target.value;
    // Check whether the value is represented in the list of certificates;
    // if not, then all certs should be visible
    const matchingCertificates = certificates.filter(cert => cert.id === Number(value));
    if (matchingCertificates.length) {
      this.setState({ selectedCertificateId: value });
    } else {
      this.setState({ selectedCertificateId: undefined });
    }
  }

  handleQualificationDelete() {
    // TODO: bring up a modal, etc., etc.
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
    const { certificates, isAdmin, qualifications, regions } = this.props;
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
        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by region
        </h2>
        <RegionFilter regions={regions} onChange={this.handleRegionToggle} />
        <h2 className="sinc-section-header sinc-section-header--minor">
          Filter by certification
        </h2>
        <div className="form-group row">
          <label htmlFor="certificate" className="col-sm-6 col-md-3 col-form-label">
            Certification
          </label>
          <div className="col-sm-6 col-md-4 col-lg-3">
            <CertificateSelector
              onChange={this.handleCertificateSelect}
              certificates={certificates}
            />
          </div>
        </div>
        <h2 className="sinc-section-header">
          Results
        </h2>
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

function columnDefinitions(getSortingColumns, isAdmin, onClickToDelete) {
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
    defaultColumn('date_granted', 'Date granted', {
      // Format the date granted in the table as DD/MM/YYYY
      cell: {
        formatters: [
          dateString => moment(dateString, 'YYYY-MM-DD').format('DD/MM/YYYY')
        ],
      },
    }),
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
            <div className="d-flex">
              <Link
                to={`${paths.EDIT_QUALIFICATION}/${id}`}
                className="btn btn-primary sinc-btn--compact"
              >
                <i className="fa fa-fw fa-edit" />
              </Link>
              {isAdmin && <DeleteButton onClick={onClickToDelete} />}
            </div>
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
