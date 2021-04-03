import axios from 'axios';
import endpoints from '@endPoints';

const getCollections = async () => {
  try {
    const url = endpoints.GET_COLLECTIONS;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const getCollection = async (id) => {
  try {
    const url = endpoints.GET_COLLECTION;
    return axios.get(`${url}/${id}`);
  } catch (err) {
    console.log(err);
  }
};

const processingCollection = async (data) => {
  try {
    const url = endpoints.PROCESS_COLLECTION;
    return axios.post(url, data);
  } catch (err) {
    console.log(err);
  }
};

const getCategory = async () => {
  try {
    const url = endpoints.GET_CATEGORY;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const getService = async () => {
  try {
    const url = endpoints.GET_SERVICE;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

export default {
  getCollections,
  getCollection,
  processingCollection,
  getCategory,
  getService,
};
