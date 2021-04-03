import { ACCOUNT } from '@types';
import { admin as API } from '@api';

const createAccount = (data) => {
  return {
    type: ACCOUNT.CREATE_ACCOUNT,
    payload: API.createAccount(data),
  };
};

const deleteAccount = (username) => {
  return {
    type: ACCOUNT.DELETE_ACCOUNT,
    payload: API.deleteAccount(username),
  };
};

const getAccounts = () => {
  return {
    type: ACCOUNT.GET_ACCOUNTS,
    payload: API.getAccounts(),
  };
};

const getAccount = (id) => {
  return {
    type: ACCOUNT.GET_ACCOUNT,
    payload: API.getAccount(id),
  };
};


const getType = () => {
  return {
    type: ACCOUNT.GET_TYPE,
    payload: API.getBusinessType(),
  };
};

const resetAccount = () => {
  return {
    type: ACCOUNT.RESET_ACCOUNT,
    payload: null,
  };
};

const updateStatus = (status, id) => {
  return {
    type: ACCOUNT.UPDATE_STATUS,
    payload: API.updateStatus(status, id)  
  };
};

const updateRole = (role, id) => {
  return {
    type: ACCOUNT.UPDATE_ROLE,
    payload: API.updateRole(role, id)
  };
};

export default {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateStatus,
  updateRole,
  resetAccount,
  getType
};
