import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { GridComponent } from '@components/grid';
import { AG_GRID_UTILS } from '@utils/index';
import { Button } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { TAG_INDEX_BOOKING, TEST_ID } from '@constants';

export const BookingTableComponent = (props) => {
  const data = props.bookingData;
  const [apis, setApis] = useState({});

  const DEFAULT_COL_DEF = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
    filterParams: {
      buttons: ['reset'],
      debounceMs: 200,
    },
  };

  const COL_DEFS = [
    {
      headerName: 'Booking ID',
      field: 'dataId',
      width: 40,
      headerTooltip: 'The ID of the booking',
      filter: 'agNumberColumnFilter',
      sort: 'desc', // Add this to sort by Booking ID (descending) as default
    },
    {
      headerName: 'Customer ID',
      field: 'customerId',
      hide: true,
      width: 40,
      headerTooltip: 'The ID of the customer',
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'Customer',
      field: 'customerName',
      headerTooltip: 'The name of the customer',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Site ID',
      field: 'siteId',
      hide: true,
      width: 40,
      headerTooltip: 'The ID of the site',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Site',
      field: 'siteName',
      headerTooltip: 'The name of the site',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Booking Date',
      field: 'bookingDate',
      width: 130,
      headerTooltip: 'The date when the booking is made',
      comparator: AG_GRID_UTILS.dateSortComparator, // Add this to sort date
      filter: 'agDateColumnFilter',
      filterParams: {
        ...DEFAULT_COL_DEF.filterParams,
        comparator: AG_GRID_UTILS.dateComparator,
        browserDatePicker: true,
      },
    },
    {
      headerName: 'Collection Date',
      field: 'collectionDate',
      width: 130,
      headerTooltip: 'The date of the scheduled collection',
      comparator: AG_GRID_UTILS.dateSortComparator, // Add this to sort date
      filter: 'agDateColumnFilter',
      filterParams: {
        ...DEFAULT_COL_DEF.filterParams,
        comparator: AG_GRID_UTILS.dateComparator,
        browserDatePicker: true,
      },
      autoHeight: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      headerTooltip: 'The status of the booking',
      width: 160,
      comparator: AG_GRID_UTILS.statusSortComparatorBuilder(TAG_INDEX_BOOKING), // Add this to sort status
      pinned: 'right',
      cellRenderer: 'TagRenderer',
      filter: true,
      filterParams: AG_GRID_UTILS.statusFilterParamsBuilder(
        Object.keys(TAG_INDEX_BOOKING)
      ),
    },
  ];

  /**
   * Handle booking edit.
   *
   * @param {number} bookingId - id of booking to edit
   */
  const editBooking = (bookingId) => {
    props.editBooking(bookingId);
  };

  /**
   * Handle booking(s) delete.
   */
  const deleteBooking = () => {
    if (apis.gridApi !== undefined && apis.columnApi !== undefined) {
      const bookingIds = apis.gridApi
        .getSelectedRows()
        .map((rowData) => rowData.dataId);
      props.deleteBookings(bookingIds);
    }
  };

  /**
   * Handle booking creation.
   */
  const createBooking = () => {
    if (apis.gridApi !== undefined && apis.columnApi !== undefined) {
      props.createBooking();
    }
  };

  // Pass some additional args to the ag-grid.
  const additionalAgGridArgs = {
    rowSelection: 'multiple',
    rowDeselection: true,
  };

  // The button to delete a booking.
  const deleteBtn = (
    <Button
      key={'delete-button'}
      type={'primary'}
      danger
      icon={<MinusCircleOutlined />}
      disabled={
        apis.gridApi === undefined ||
        apis.gridApi.getSelectedRows().length === 0
      }
      onClick={deleteBooking}
      data-testid={TEST_ID.BOOKING_DELETE_BTN}
    >
      Delete
    </Button>
  );

  // The button to create new bookings.
  const createBtn = (
    <Button
      key={'create-button'}
      type={'primary'}
      icon={<PlusCircleOutlined />}
      onClick={createBooking}
      data-testid={TEST_ID.BOOKING_CREATE_BTN}
    >
      Create
    </Button>
  );

  // Pass additional JSX components to the header.
  // Examples can be 'delete' or 'new' buttons.
  const additionalHeaderContents = [deleteBtn, createBtn];

  return (
    <GridComponent
      data={data}
      colDefs={COL_DEFS}
      defaultColDefs={DEFAULT_COL_DEF}
      additionalAgGridArgs={additionalAgGridArgs}
      additionalHeaderContents={additionalHeaderContents}
      setApis={setApis}
      doubleClickCallBack={(rowData) => editBooking(rowData.data.dataId)}
    />
  );
};

BookingTableComponent.propTypes = {
  bookingData: PropTypes.array.isRequired,
  createBooking: PropTypes.func.isRequired,
  editBooking: PropTypes.func.isRequired,
  deleteBookings: PropTypes.func.isRequired,
};
