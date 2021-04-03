import axios from 'axios';
import endpoints from '@endPoints';

const createAccount = async (data) => {
  try {
    const url = endpoints.SIGNUP;
    // staffId === undefined ? (staffId = '') : (staffId = staffId)
    const headers = {
      'Content-Type': 'application/json',
    };
    const response = await axios.post(url, data, {
      headers: headers,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteAccount = (username) => {
  try {
    const url = endpoints.DELETE_ACCOUNT;
    const requestBody = new FormData();
    requestBody.append('username', username);

    return axios.post(url, requestBody);
  } catch (err) {
    console.log(err);
  }
};

const getAccounts =  () => {
  try {
    const url = endpoints.GET_ACCOUNTS;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const getAccount = (id) => {
  try {
    const url = `${endpoints.GET_ACCOUNT}/${id}`;
    return axios.get(url)
  } catch (err) {
    console.log(err);
  }
};

const getBusinessType = () => {
  try {
    const url = endpoints.GET_TYPE;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const updateStatus = (enabled, id) => {
  try {
    const url = `${endpoints.GET_ACCOUNT}/${id}/enable`;
    const requestBody = new FormData();
    requestBody.append('status', enabled); 
    return axios.post(url, requestBody);
  } catch (err) {
    console.log(err);
    Promise.reject(err.response.data);
    return err.response.data;
  }
};

const updateRole = (role, id) => {
  try {
    const url = `${endpoints.GET_ACCOUNT}/${id}/role`;
    const requestBody = new FormData();
    requestBody.append('role', role);
    
    return axios.post(url, requestBody);
  } catch (err) {
    console.log(err);
    Promise.reject(err.response.data);
    return err.response.data;
  }
};

export default {
  createAccount,
  deleteAccount,
  getAccounts,
  getAccount,
  updateStatus,
  updateRole,
  getBusinessType
};
