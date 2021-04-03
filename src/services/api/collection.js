import axios from 'axios';
import endpoints from '@endPoints';
import { useSelector } from 'react-redux';

const getCollections = (customerCollections = false) => {
  try {
    const url =
      customerCollections
        ? endpoints.GET_CUSTOMER_COLLECTIONS
        : endpoints.GET_COLLECTIONS;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const getCollection = (collectionId) => {
  try {
    const url = `${endpoints.GET_COLLECTION}/${collectionId}`;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
};

const createCollection = (data) => {
  try {
    const url = endpoints.CREATE_COLLECTION;
    return axios.post(url, data);
  } catch (err) {
    console.log(err);
  }
};

const updateCollection = (data) => {
  try {
    const url = endpoints.UPDATE_COLLECTION;
    return axios.put(url, data);
  } catch (err) {
    console.log(err);
  }
};

const deleteCollections = (dataIds) => {
  try {
    const url = endpoints.DELETE_COLLECTIONS;
    return axios.post(url, { dataId: dataIds });
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

const getContainerTypes = async () => {
  try {
    const url = endpoints.GET_CONTAINER_TYPES;
    return axios.get(url);
  } catch (err) {
    console.log(err);
  }
}

export default {
  getCollections,
  getCollection,
  createCollection,
  deleteCollections,
  updateCollection,
  getCategory,
  getContainerTypes,
};
