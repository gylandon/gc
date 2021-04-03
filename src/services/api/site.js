import axios from 'axios';
import endpoints from '@endPoints';

const getSites = (customerId) => {
  try {
    const url = `${endpoints.GET_SITES}?uid=${customerId}`;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const deleteSite = async (sid) => {
  try {
    const url = endpoints.DELETESITE;
    const requestBody = new FormData();
    requestBody.append('sid', sid);
    const response = await axios.post(url, requestBody);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const addSite = async (data) => {
  try {
    const url = endpoints.ADDSITE;
    const requestBody = new FormData();
    requestBody.append('location', data.location);
    requestBody.append('name', data.name);
    const response = await axios.post(url, requestBody);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const updateSite = async (data) => {
  try {
    const url = endpoints.UPDATESITE;
    const requestBody = new FormData();
    requestBody.append('location', data.location);
    requestBody.append('name', data.name);
    requestBody.append('sid', data.sid);
    const response = await axios.post(url, requestBody);
    return response;
  } catch (err) {
    console.log(err);
    Promise.reject(err.response.data);
    return err.response.data;
  }
};

export default {
  getSites,
  deleteSite,
  addSite,
  updateSite,
};
