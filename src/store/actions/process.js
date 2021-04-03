import { PROCESSING } from '@types';
import { processing as API } from '@api';

const getCollections = () => {
  return {
    type: PROCESSING.GET_COLLECTIONS,
    payload: API.getCollections(),
  };
};

const getCollection = (id) => {
  return {
    type: PROCESSING.GET_COLLECTION,
    payload: API.getCollection(id),
  };
};

const processCollection = (data) => {
  return {
    type: PROCESSING.PROCESS_COLLECTION,
    payload: data,
  };
};

export default {
  getCollections,
  getCollection,
  processCollection,
};
