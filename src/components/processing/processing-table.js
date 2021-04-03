import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { GridComponent } from '@components/grid';
import { AG_GRID_UTILS } from '@utils/index';
import { Modal } from 'antd';
import { ProcessingFormComponent } from './form/processing-form';
import { DetailFormComponent } from './form/detail-form';
import style from './index.less';
import { processing as processingApi } from '@actions';
import { processing as API } from '@api';
import { toastify } from '@utils';
import { TAG_INDEX_COLLECTION, TEST_ID, TAGS } from '@constants';

export const ProcessingTableComponent = (props) => {
  const { collections } = useSelector((state) => state.processing);
  const collectionsData = (collections.data || []).map((collection) => {
    collection.status = Array.isArray(collection.status)
      ? collection.status
      : [collection.status];
    return collection;
  });
  const [apis, setApis] = useState({});
  const [detailVisible, setDetailVisible] = useState(false);
  const [processVisible, setProcessVisible] = useState(false);

  const [curId, setCurId] = useState(0);

  const dataSource = useSelector(
    (state) => state.processing.processingCollection.data || []
  );
  console.log('h', dataSource);

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
      width: 40,
      headerTooltip: 'The ID of the collection data',
      filter: 'agNumberColumnFilter',
    },
    {
      headerName: 'C-ID',
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
      headerName: 'S-ID',
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
      headerName: 'Collection Date',
      field: 'date',
      width: 130,
      headerTooltip: 'The date of the scheduled collection',
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
      headerName: 'Status',
      field: 'status',
      headerTooltip: 'The status of the booking',
      // filter: 'agSetColumnFilter',
      comparator: AG_GRID_UTILS.statusSortComparatorBuilder(
        TAG_INDEX_COLLECTION
      ),
      width: 160,
      pinned: 'right',
      cellRenderer: 'TagRenderer',
      filter: true,
      filterParams: AG_GRID_UTILS.statusFilterParamsBuilder(
        Object.keys(TAG_INDEX_COLLECTION)
      ),
      sort: 'asc',
    },
  ];

  /**
   * Handle collection edit.
   * @param {number} id - id of collection to edit
   */
  const processing = (data) => {
    console.log(`+++ Edit booking with id ${data.dataId}`);
    setCurId(data.dataId);
    console.log(data.status, data.status[0], TAGS.UNPROCESSED);
    if (data.status[0] === TAGS.UNPROCESSED) {
      setProcessVisible(true);
    } else {
      setDetailVisible(true);
    }
  };

  /**
   * Handle booking(s) delete.
   */
  // const deleteBooking = () => {
  //   if (apis.gridApi !== undefined && apis.columnApi !== undefined) {
  //     console.log(
  //       '+++ Delete button clicked. Bookings to delete:',
  //       apis.gridApi.getSelectedRows().map((rowData) => rowData.dataId)
  //     );
  //   }
  // };

  /**
   * Handle booking creation.
   */
  // const createBooking = () => {
  //   if (apis.gridApi !== undefined && apis.columnApi !== undefined) {
  //     console.log('+++ Create button clicked.');
  //   }
  // };

  // Pass some additional args to the ag-grid.
  const additionalAgGridArgs = {
    rowSelection: 'multiple',
    rowDeselection: true,
  };

  // The button to delete a booking.
  // const deleteBtn = (
  //   <Button
  //     key={'delete-button'}
  //     type={'primary'}
  //     danger
  //     icon={<MinusCircleOutlined />}
  //     disabled={
  //       apis.gridApi === undefined ||
  //       apis.gridApi.getSelectedRows().length === 0
  //     }
  //     onClick={deleteBooking}
  //   >
  //     Delete
  //   </Button>
  // );

  // The button to create new bookings.
  // const createBtn = (
  //   <Button
  //     key={'create-button'}
  //     type={'primary'}
  //     icon={<PlusCircleOutlined />}
  //     onClick={createBooking}
  //   >
  //     Create
  //   </Button>
  // );

  // Pass additional JSX components to the header.
  // Examples can be 'delete' or 'new' buttons.
  const additionalHeaderContents = [];
  const [selectType, setSelectType] = useState(1);

  const handleOk = useCallback(() => {
    console.log('hh', dataSource);
    API.processingCollection({
      serviceType: selectType,
      collection: curId,
      items: dataSource,
    }).then(
      () => {
        toastify.toastSuccess('process collection success');
      },
      () => {
        toastify.toastError('process collection fail');
      }
    );
    setProcessVisible(false);
    dispatch(processingApi.processCollection([]));
  }, [dataSource]);

  const handleCancel = useCallback(() => {
    setProcessVisible(false);
    setDetailVisible(false);
    dispatch(processingApi.processCollection([]));
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!detailVisible && !processVisible) {
      dispatch(processingApi.getCollections());
    } else {
      dispatch(processingApi.getCollection(curId));
    }
  }, [detailVisible, processVisible]);

  return (
    <>
      <GridComponent
        data={collectionsData || []}
        colDefs={COL_DEFS}
        defaultColDefs={DEFAULT_COL_DEF}
        onGridReady={function (params) {
          var defaultSortModel = [
            {
              colId: 'status',
              comparator: AG_GRID_UTILS.statusSortComparatorBuilder(
                TAG_INDEX_COLLECTION
              ),
            },
          ];
          console.log('haha');
          params.api.setSortModel(defaultSortModel);
        }}
        additionalAgGridArgs={additionalAgGridArgs}
        additionalHeaderContents={additionalHeaderContents}
        setApis={setApis}
        doubleClickCallBack={(rowData) => processing(rowData.data)}
      />
      <Modal
        title={'Processing Collection'}
        visible={processVisible}
        onOk={handleOk}
        okText={'Submit'}
        onCancel={handleCancel}
        width={'800px'}
        destroyOnClose={true}
      >
        <ProcessingFormComponent
          selectType={selectType}
          changeSelectType={(v) => {
            setSelectType(v);
          }}
        ></ProcessingFormComponent>
      </Modal>
      <Modal
        title={'Processed Collection Detail '}
        visible={detailVisible}
        onCancel={handleCancel}
        okButtonProps={{ style: { display: 'none' } }}
        cancelText={'Ok'}
        width={'800px'}
        destroyOnClose={true}
      >
        <DetailFormComponent></DetailFormComponent>
      </Modal>
    </>
  );
};
