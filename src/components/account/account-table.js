import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GridComponent } from '@components/grid';
import { Button } from 'antd';
import { accountAction } from '@actions/index';
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  FormOutlined,
} from '@ant-design/icons';
import { AG_GRID_UTILS, toastify } from '@utils/index';
import { ViewModal, createModal as Modal } from '@components/account';
import { useDispatch } from 'react-redux';
import { TAG_INDEX_ACCOUNT, TEST_ID, STRINGS } from '@constants';

export const AccountTableComponent = (props) => {
  const data = props.accountData;
  const [apis, setApis] = useState({});
  const [curId, setCurId] = useState('');
  // const [newAcc, setNewAcc] = useState({});
  const [visible, setVisible] = useState(false);
  const [visibleView, setVisibleView] = useState(false);

  const dispatch = useDispatch();


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
      headerName: 'UserId',
      field: 'uid',
      width: 20,
      headerTooltip: 'The ID of the user',
      filter: 'agNumberColumnFilter',
      sort: 'desc'
    },
    {
      headerName: 'Username',
      field: 'username',
      hide: true,
      headerTooltip: 'The username of the account',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Name',
      field: 'name',
      headerTooltip: 'The name of the account',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Role',
      field: 'role',
      headerTooltip: 'The role of the account',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'RoleId',
      field: 'rid',
      hide: true,
      headerTooltip: 'The role id of the account',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 40,
      headerTooltip: 'The email of the account',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Phone',
      field: 'phone',
      width: 20,
      headerTooltip: 'The phone of the account',
      filter: 'agTextColumnFilter',
    },
    {
      headerName: 'Status',
      field: 'status',
      headerTooltip: 'The status of the account',
      width: 160,
      comparator: AG_GRID_UTILS.statusSortComparatorBuilder(TAG_INDEX_ACCOUNT), // Add this to sort status
      pinned: 'right',
      cellRenderer: 'TagRenderer',
      filter: true,
      filterParams: AG_GRID_UTILS.statusFilterParamsBuilder(
        Object.keys(TAG_INDEX_ACCOUNT)
      ),
    },
  ];

  /**
   * Handle account(s) delete.
   */
  const deleteAccount = () => {
    if (apis.gridApi !== undefined && apis.columnApi !== undefined) {
      const usernames = apis.gridApi
        .getSelectedRows()
        .map((rowData) => rowData.username);
      props.deleteAccounts(usernames);
    }
  };

  /**
   * Handle account creation.
   */
  const createAccount = () => {
    // if (apis.gridApi !== undefined && apis.columnApi !== undefined) {
    setVisible(true);
    // }
  };

  /**
   * Handle account edit.
   *
   * @param {number} accountId - id of account to edit
   */
  const editAccount = (doubleId, type) => {
    if (apis.gridApi !== undefined && apis.columnApi !== undefined) {
      if (type === 'double') {
        setCurId(doubleId);
      } else {
        const id = apis.gridApi.getSelectedRows().map((rowData) => rowData.uid);
        setCurId(id[0]);
      }
      setVisibleView(true);
    }
  };

  // Pass some additional args to the ag-grid.
  const additionalAgGridArgs = {
    rowSelection: 'multiple',
    rowDeselection: true,
  };

  // The button to delete a account.
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
      onClick={deleteAccount}
    >
      Delete
    </Button>
  );

  // The button to create new accounts.
  const createBtn = (
    <Button
      key={'create-button'}
      type={'primary'}
      icon={<PlusCircleOutlined />}
      onClick={createAccount}
    >
      Create
    </Button>
  );

  const editBtn = (
    <Button
      key={'edit-button'}
      type={'primary'}
      style={{ backgroundColor: '#1890ff', width: '94px' }}
      icon={<FormOutlined />}
      disabled={
        apis.gridApi === undefined ||
        apis.gridApi.getSelectedRows().length === 0
      }
      onClick={() => editAccount(null, 'single')}
    >
      Edit
    </Button>
  );

  const onCreate = (values) => {
    setVisible(false);
    const realLo = [];
    if (
      Array.isArray(values.sites) &&
      values.sites[0].sName !== undefined &&
      values.role === 1
    ) {
      values.sites.map((item, index) => {
        const cur = {
          siteId: `S0${index + 1}`,
          name: item.sName,
          location: item.site,
        };
        realLo.push(cur);
      });
    }

    if (values.enabled === undefined) {
      values.enabled = false;
    }
    const data = {
      email: values.email,
      username: values.name,
      name: values.name,
      password: values.password,
      phone: `${values.prefix}${values.phone}`,
      sites: realLo,
      role: values.role,
      enabled: values.enabled,
      businessType: values.role!=1 ? 10 :parseInt(values.type, 10) 
    };
    // setNewAcc(data);
    dispatch(accountAction.createAccount(data))
      .then(() => {
        dispatch(accountAction.getAccounts())
          .then(() => {
            toastify.toastSuccess(STRINGS.TOAST_ACCOUNT_CREATE_SUCCESS);
          })
          .catch((error) => {
            toastify.toastError(STRINGS.TOAST_ACCOUNTS_LOAD_ERROR);
          });
      })
      .catch((error) => {
        toastify.toastError(STRINGS.TOAST_ACCOUNT_CREATE_ERROR);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onViewCreate = (values) => {
    setVisibleView(false);
    const curData = data.filter(d => d.uid === curId)

    dispatch(accountAction.updateStatus(values.enabled, curId))
      .then(() => {
        if(values.role){
          dispatch(accountAction.updateRole(values.role, curId))
            .then(() => {
              dispatch(accountAction.getAccounts())
                .then(() => {
                  toastify.toastSuccess(STRINGS.TOAST_ACCOUNT_UPDATE_SUCCESS);
                })
                .catch((error) => {
                  console.log(error)
                  toastify.toastError(STRINGS.TOAST_ACCOUNTS_LOAD_ERROR);
                });
            })
            .catch((error) => {
              console.log(error)
              toastify.toastError(STRINGS.TOAST_ACCOUNT_UPDATE_ERROR);
            })
        }else{
          dispatch(accountAction.getAccounts())
          .then(() => {
            toastify.toastSuccess(STRINGS.TOAST_ACCOUNT_UPDATE_SUCCESS);
          })
          .catch((error) => {
            console.log(error)
            toastify.toastError(STRINGS.TOAST_ACCOUNTS_LOAD_ERROR);
          });
        }
        
      })
  };

  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const onViewCancel = useCallback(() => {
    setVisibleView(false);
  }, []);

  useEffect(() => {
    if (visibleView) {
      dispatch(accountAction.getAccount(curId)); 
    } else {
      dispatch(accountAction.resetAccount());
    }
  }, [visibleView]);

  // Pass additional JSX components to the header.
  // Examples can be 'delete' or 'new' buttons.
  const additionalHeaderContents = [deleteBtn, editBtn, createBtn];

  return (
    <>
      <GridComponent
        data={data}
        colDefs={COL_DEFS}
        defaultColDefs={DEFAULT_COL_DEF}
        additionalAgGridArgs={additionalAgGridArgs}
        additionalHeaderContents={additionalHeaderContents}
        setApis={setApis}
        doubleClickCallBack={(rowData) =>
          editAccount(rowData.data.uid, 'double')
        }
      />
      <Modal
        visible={visible}
        onCreate={onCreate}
        onCancel={onCancel}
        title="Create a new account"
        setVisible={setVisible}
      />
      <ViewModal
        visible={visibleView}
        onCreate={onViewCreate}
        onCancel={onViewCancel}
        title="Edit an account"
        id={curId}
        setVisible={setVisibleView}
      />
    </>
  );
};

AccountTableComponent.propTypes = {
  accountData: PropTypes.array.isRequired,
  deleteAccounts: PropTypes.func.isRequired,
};
