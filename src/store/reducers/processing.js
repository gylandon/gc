import { PROCESSING } from '@types';

const INITIAL_STATE = {
  // All collections.
  collections: {
    data: [],
    error: null,
    isPending: false,
  },

  // The current collection.
  currentCollection: {
    data: null,
    error: null,
    isPending: false,
  },

  // During processing a collection.
  processingCollection: {
    data: null,
    error: null,
    isPending: false,
  },
};

const ProcessingReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    // Get all collections.
    case PROCESSING.GET_COLLECTIONS_FULFILLED: {
      const collections = {
        ...state.collections,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, collections };
    }

    case PROCESSING.GET_COLLECTIONS_PENDING: {
      const collections = {
        ...state.collections,
        data: [],
        error: null,
        isPending: true,
      };
      return { ...state, collections };
    }

    case PROCESSING.GET_COLLECTIONS_REJECTED: {
      const collections = {
        ...state.collections,
        data: [],
        error: payload.data.msg,
        isPending: false,
      };
      return { ...state, collections };
    }

    // Get a collection.
    case PROCESSING.GET_COLLECTION_FULFILLED: {
      const currentCollection = {
        ...state.currentCollection,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, currentCollection };
    }

    case PROCESSING.GET_COLLECTION_PENDING: {
      const currentCollection = {
        ...state.currentCollection,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, currentCollection };
    }

    case PROCESSING.GET_COLLECTION_REJECTED: {
      const currentCollection = {
        ...state.currentCollection,
        data: null,
        error: payload.data.msg,
        isPending: false,
      };
      return { ...state, currentCollection };
    }

    case PROCESSING.PROCESS_COLLECTION: {
      const processingCollection = {
        ...state.processingCollection,
        data: payload,
        error: null,
        isPending: false,
      };
      return { ...state, processingCollection };
    }

    // case PROCESSING.PROCESS_COLLECTION_PENDING: {

    // }

    // case PROCESSING.PROCESS_COLLECTION_REJECTED: {

    // }

    default: {
      return state;
    }
  }
};

export { INITIAL_STATE, ProcessingReducer };
