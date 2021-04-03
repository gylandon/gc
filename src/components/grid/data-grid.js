import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, Menu, Dropdown, Spin, Checkbox, Space } from 'antd';
import { DownCircleFilled } from '@ant-design/icons';
import { TagRenderer } from './renderers';

const GridComponent = (props) => {
  // The API of ag-grid.
  const [gridApi, setGridApi] = useState(null);
  // The API of ag-grid columns.
  const [columnApi, setColumnApi] = useState(null);
  // The visibility of the dropdown menu.
  const [dropDownVisible, setDropDownVisible] = useState(false);
  // The visibility of columns in the ag-grid.
  const [colsVisibility, setColsVisibility] = useState([]);
  // Props.
  const {
    data,
    colDefs,
    defaultColDefs,
    autoGroupColumnDef,
    additionalHeaderContents,
    additionalAgGridArgs,
  } = props;
  // Components used in framework.
  const frameworkComponents = {
    TagRenderer: TagRenderer,
  };

  /**
   * Update the apis reference for the caller.
   * Need to make sure the caller has setApis in its useState.
   * Call this method in handlers for events that need to be monitored.
   */
  const updateApisForCaller = () => {
    if (props.setApis !== undefined) {
      const newApis = {
        gridApi: gridApi,
        columnApi: columnApi,
      };
      props.setApis(newApis);
    }
  };

  /**
   * Handles column visibility checkboxes change.
   *
   * @param {object} col - the column object
   * @param {object} e - event
   */
  const onColVisibilityCheckChange = (col, e) => {
    if (columnApi !== null) {
      columnApi.setColumnVisible(col, e.target.checked);
      if (gridApi !== null) {
        gridApi.sizeColumnsToFit();
      }
      updateVisibility();
    }
  };

  /**
   * Get the menu items of the columns' visibility dropdown menu.
   *
   * @return {Array} - an array of Menu.Item JSX
   */
  const getColsVisibilityMenuItems = () => {
    if (colsVisibility.length === 0) {
      return (
        <Menu.Item key="1" disabled={true}>
          <Spin />
        </Menu.Item>
      );
    } else {
      return colsVisibility.map((col) => {
        return (
          <Menu.Item key={col.id}>
            <Checkbox
              checked={col.visible}
              onChange={(e) => onColVisibilityCheckChange(col.id, e)}
            >
              {col.headerName}
            </Checkbox>
          </Menu.Item>
        );
      });
    }
  };

  /**
   * Handle the event when grid is ready.
   *
   * @param {object} params - parameters passed by ag-grid
   */
  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
    const newApis = {
      gridApi: params.api,
      columnApi: params.columnApi,
    };
    props.setApis(newApis);
  };

  /**
   * Handle the event when selection changed.
   */
  const onSelectionChanged = () => {
    updateApisForCaller();
  };

  /**
   * Handle the event when a row is double clicked.
   *
   * @param {object} rowData - row data
   */
  const onRowDoubleClicked = (rowData) => {
    if (props.doubleClickCallBack !== undefined) {
      props.doubleClickCallBack(rowData);
    }
  };

  /**
   * Update column visibility state.
   */
  const updateVisibility = () => {
    const visibility = [];
    columnApi.getAllColumns().forEach((col) => {
      visibility.push({
        id: col.getColId(),
        visible: col.isVisible(),
        headerName: col.getColDef().headerName,
      });
    });
    setColsVisibility(visibility);
  };

  /**
   * Render the header section of the grid.
   *
   * @return {JSX} - the grid header
   */
  const renderHeader = () => {
    const selectColDropdownMenu = (
      <Dropdown
        key={'select-columns-dropdown'}
        trigger={['click']}
        overlay={<Menu>{getColsVisibilityMenuItems()}</Menu>}
        onVisibleChange={(flag) => {
          setDropDownVisible(flag);
        }}
        visible={dropDownVisible}
      >
        <Button>
          Select Columns <DownCircleFilled />
        </Button>
      </Dropdown>
    );
    const headerComponents = [selectColDropdownMenu];
    if (
      additionalHeaderContents !== undefined &&
      additionalHeaderContents.length > 0
    ) {
      for (const content of additionalHeaderContents) {
        if (Object.prototype.hasOwnProperty.call(content, 'key')) {
          headerComponents.push(content);
        }
      }
    }
    return <Space>{headerComponents}</Space>;
  };

  /**
   * Render the header section of the grid.
   *
   * @return {JSX} - the grid body
   */
  const renderBody = () => {
    const args = additionalAgGridArgs === undefined ? {} : additionalAgGridArgs;
    args.columnDefs = colDefs;
    args.rowData = data;
    args.modules = props.modules;
    args.defaultColDef = defaultColDefs;
    args.immutableData = true;
    args.getRowNodeId = (d) => d.dataId;
    args.onGridReady = onGridReady;
    args.animateRows = true;
    args.suppressMenuHide = true;
    args.autoGroupColumnDef = autoGroupColumnDef;
    args.frameworkComponents = frameworkComponents;
    args.onSelectionChanged = onSelectionChanged;
    args.onRowDoubleClicked = onRowDoubleClicked;
    args.pagination = true;
    args.paginationAutoPageSize = true;
    return (
      <div className="ag-theme-alpine" style={{ height: '80%', width: '100%' }}>
        <AgGridReact {...args} />
      </div>
    );
  };

  // Initialize column visibility states after the grid is loaded.
  if (columnApi !== null && colsVisibility.length === 0) {
    updateVisibility();
  }

  return (
    <div style={{ width: '90%', height: '100%', marginLeft: '20px' }}>
      {renderHeader()}
      {renderBody()}
    </div>
  );
};

GridComponent.propTypes = {
  // The actual table data.
  data: PropTypes.array.isRequired,
  // The column defs.
  colDefs: PropTypes.array.isRequired,
  // The call back when a row is double clicked. It should accept a single arg: the row clicked.
  doubleClickCallBack: PropTypes.func,
  // The default column def, which will be overridden by settings in colDefs.
  defaultColDefs: PropTypes.object,
  // Put additional header JSX component in this array.
  // Note, each of these component should has a unique 'key' attr, otherwise it
  //  will not be rendered.
  additionalHeaderContents: PropTypes.array,
  // Put additional args for ag-grid in this object.
  additionalAgGridArgs: PropTypes.object,
  // A function for useState to set the apis of the grid. Need to use 'updateApisForCaller()'
  //  in handlers for events to monitor (e.g. see 'onSelectionChanged').
  setApis: PropTypes.func,
};

export { GridComponent };
