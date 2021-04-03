import { COLLECTION } from '@types';

const INITIAL_STATE = {
  collections: {
    data: [],
    error: null,
    isPending: false,
  },

  currentCollection: {
    data: null,
    error: null,
    isPending: false,
  },

  creatingCollection: {
    data: null,
    error: null,
    isPending: false,
  },

  deletingCollection: {
    data: null,
    error: null,
    isPending: false,
  },
};

const CollectionReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case COLLECTION.GET_COLLECTIONS_FULFILLED: {
      const collections = {
        ...state.collections,
        data: payload.data.data.map((o) => ({
          ...o,
          status: [o.status || 'PENDING'],
        })),
        error: null,
        isPending: false,
      };
      return { ...state, collections };
    }

    case COLLECTION.GET_COLLECTIONS_PENDING: {
      const collections = {
        ...state.collections,
        data: [],
        error: null,
        isPending: true,
      };
      return { ...state, collections };
    }

    case COLLECTION.GET_COLLECTIONS_REJECTED: {
      const collections = {
        ...state.collections,
        data: null,
        error: true,
        isPending: false,
      };
      return { ...state, collections };
    }

    case COLLECTION.GET_COLLECTION_FULFILLED: {
      const currentCollection = {
        ...state.currentCollection,
        data: payload.data,
        error: null,
        isPending: false,
      };
      return { ...state, currentCollection };
    }

    case COLLECTION.GET_COLLECTION_PENDING: {
      const currentCollection = {
        ...state.currentCollection,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, currentCollection };
    }

    case COLLECTION.GET_COLLECTION_REJECTED: {
      const currentCollection = {
        ...state.currentCollection,
        data: null,
        error: true,
        isPending: false,
      };
      return { ...state, currentCollection };
    }

    case COLLECTION.RESET_COLLECTION: {
      const currentCollection = {
        data: null,
        error: null,
        isPending: false,
      };
      return { ...state, currentCollection };
    }

    default: {
      return state;
    }
  }
};

export { INITIAL_STATE, CollectionReducer };
