import React, { useState, useEffect } from 'react';
import { toastify, ToastContainer } from '@utils';
import { HeaderLogged } from '@header';
import { AccountTableComponent } from '@components/account';
import { useSelector, useDispatch } from 'react-redux';
import styles from './account.less';
import { accountAction } from '@actions/index';
import { TagErrorPlaceholder } from '@components/placeholders';
import { Spin } from 'antd';
import { STRINGS } from '@constants';


export const AccountView = (props) => {
  const userInfo = useSelector((state) => state.auth);
  let role = '';
  if (userInfo[0].signed) {
    role = userInfo[0].data.role[0].roleName;
  }
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(accountAction.getAccounts());
  }, []);
  const accountData = useSelector((state) => state.account.accounts);

  if (accountData.data != null) {
    accountData.data.map((item) => {
      item.dataId = item.uid;
      const status = [];
      item.enabled ? status.push('ENABLED') : status.push('DISABLED');
      item.status = status;
      if (item.role === 4) {
        item.rid = 4;
        item.role = 'Administrator';
      } else if (item.role === 3) {
        item.rid = 3;
        item.role = 'Processor';
      } else if (item.role === 2) {
        item.rid = 2;
        item.role = 'Driver';
      } else if (item.role === 1) {
        item.role = 'Customer';
        item.rid = 1;
      }
    });
  }

  const deleteAccounts = (username) => {
    if (accountData.data != []) {
      dispatch(accountAction.deleteAccount(username[0]))
        .then(() => {
          dispatch(accountAction.getAccounts())
            .then(() => {
              toastify.toastSuccess(STRINGS.TOAST_ACCOUNT_DELETE_SUCCESS);
            })
            .catch((error) => {
              toastify.toastError(STRINGS.TOAST_ACCOUNTS_LOAD_ERROR);
            });
        })
        .catch((error) => {
          toastify.toastError(STRINGS.TOAST_ACCOUNT_DELETE_ERROR);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const renderHeader = () => {
    return <HeaderLogged />;
  };

  const renderBody = () => {
    if (accountData.error !== null) {
      return <TagErrorPlaceholder />;
    }
    if (loading !== accountData.isPending) {
      setLoading(accountData.isPending);
    }
    return (
      <Spin size={'large'} spinning={loading}>
        <div id={styles['account-grid-wrapper']} className={styles.bodyContainer}>
          <AccountTableComponent
            accountData={accountData.data === null ? [] : accountData.data}
            deleteAccounts={deleteAccounts}
          />
        </div>
      </Spin>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderBody()}
      <ToastContainer />
    </div>
  );
};
