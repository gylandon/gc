import { COLLECTION } from '@types';
import { collection as API } from '@api';

const getCollections = (customerCollections = false) => {
  return {
    type: COLLECTION.GET_COLLECTIONS,
    payload: API.getCollections(customerCollections),
  };
};

const getCollection = (collectionId) => {
  return {
    type: COLLECTION.GET_COLLECTION,
    payload: API.getCollection(collectionId),
  };
};

const resetCollection = () => {
  return {
    type: COLLECTION.RESET_COLLECTION,
  };
};

const createCollection = (data) => {
  return {
    type: COLLECTION.CREATE_COLLECTION,
    payload: API.createCollection(data),
  };
};

export default {
  getCollections,
  getCollection,
  resetCollection,
  createCollection,
};
