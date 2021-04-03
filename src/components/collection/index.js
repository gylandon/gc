import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { GridComponent } from '@components/grid';
import { AG_GRID_UTILS } from '@utils/index';
import { Button, Modal, Popconfirm } from 'antd';
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { TAG_INDEX_COLLECTION } from '@constants';

import { CollectionForm } from './form';

export const CollectionTableComponent = (props) => {
  const data = props.collectionData;
  const [apis, setApis] = useState({});
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [editId, setEditId] = useState(false);
  const userInfo = useSelector((state) => state.auth);
  const allowCreate =
    userInfo[0].data.role[0].roleName == 'ROLE_driver' ||
    userInfo[0].data.role[0].roleName == 'ROLE_admin';

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
      headerName: 'Collection-ID',
      field: 'dataId',
      // hide: true,
      width: 40,
      headerTooltip: '',
      filter: 'agNumberColumnFilter',
      sort: 'desc',
    },
    {
      headerName: 'Collection Date',
      field: 'date',
      width: 130,
      headerTooltip: '',
      comparator: AG_GRID_UTILS.dateSortComparator,
      filter: 'agDateColumnFilter',
      filterParams: {
        ...DEFAULT_COL_DEF.filterParams,
        comparator: AG_GRID_UTILS.dateComparator,
        browserDatePicker: true,
      },
      autoHeight: true,
    },
    {
      headerName: 'Customer',
      field: 'customerName',
      headerTooltip: '',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Notes',
      field: 'notes',
      headerTooltip: '',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Status',
      field: 'status',
      headerTooltip: '',
      width: 160,
      pinned: 'right',
      cellRenderer: 'TagRenderer',
      comparator: AG_GRID_UTILS.statusSortComparatorBuilder(TAG_INDEX_COLLECTION), // Add this to sort status
      filter: true,
      filterParams: AG_GRID_UTILS.statusFilterParamsBuilder(
        Object.keys(TAG_INDEX_COLLECTION)
      ),
    },
  ];
  const role = useSelector((state) => state.auth[0].data.role[0].rid);
  const editCollection = (collectionId, mock = false) => {
    if(role!=1){
      setEditId(collectionId);
      setVisible(true);
      setFormVisible(true);
    }
  };

  const deleteBooking = () => {
    if (apis.gridApi !== undefined && apis.columnApi !== undefined) {
      console.log(
        '+++ Delete button clicked. Bookings to delete:',
        apis.gridApi.getSelectedRows().map((rowData) => rowData.dataId)
      );
    }
  };

  /**
   * Handle booking creation.
   */
  const createBooking = () => {
    if (apis.gridApi !== undefined && apis.columnApi !== undefined) {
      console.log('+++ Create button clicked.');
    }
    setVisible(true);
    setFormVisible(true);
  };

  const handleCancel = useCallback(() => {
    setVisible(false);
    setTimeout(() => setFormVisible(false), 300);
    setEditId(false);
  }, []);

  const handleSubmit = useCallback(() => {
    setVisible(false);
    setTimeout(() => setFormVisible(false), 300);
    setEditId(false);
    props.onSubmit();
  });

  // Pass some additional args to the ag-grid.
  const additionalAgGridArgs = {
    rowSelection: 'multiple',
    rowDeselection: true,
  };

  // The button to delete a booking.
  const deleteBtn = (
    <Button
      id="delete-collections-button"
      key={'delete-button'}
      type={'primary'}
      danger
      icon={<MinusCircleOutlined />}
      disabled={
        apis.gridApi === undefined ||
        apis.gridApi.getSelectedRows().length === 0
      }
      onClick={deleteBooking}
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
    >
      Create
    </Button>
  );

  // Pass additional JSX components to the header.
  // Examples can be 'delete' or 'new' buttons.
  const additionalHeaderContents = allowCreate ? [createBtn] : [];
  const selectedCollections =
    apis.gridApi &&
    apis.gridApi.getSelectedRows().map((rowData) => rowData.dataId);

  return (
    <>
      <GridComponent
        data={data}
        colDefs={COL_DEFS}
        defaultColDefs={DEFAULT_COL_DEF}
        additionalAgGridArgs={additionalAgGridArgs}
        additionalHeaderContents={additionalHeaderContents}
        setApis={setApis}
        doubleClickCallBack={(rowData) => {
          editCollection(rowData.data.dataId);
        }}
      />
      <Modal
        width={'1000px'}
        title={!editId ? 'Add Entry' : 'Edit Entry'}
        visible={visible}
        footer={null}
        // onOk={handleOk}
        // okText={'Submit'}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      >
        {formVisible && (
          <CollectionForm
            collectionId={editId}
            onSubmit={(data) => {
              props.onSubmit(data);
              handleCancel();
            }}
            onCancel={handleCancel}
          />
        )}
      </Modal>
      {document.getElementById('delete-collections-button') &&
        ReactDOM.render(
          <Popconfirm
            title="Are you sure delete the selected collections?"
            onConfirm={() => {
              props.onDeleteCollections(selectedCollections);
            }}
            onCancel={() => {}}
            okText="Yes"
            cancelText="No"
          >
            <a href="#">Delete</a>
          </Popconfirm>,
          document.getElementById('delete-collections-button')
        )}
    </>
  );
};

CollectionTableComponent.propTypes = {
  collectionData: PropTypes.array,
};
