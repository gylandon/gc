import { SITE } from '@types';

const INITIAL_STATE = {
  // All sites for a customer.
  sites: {
    data: null,
    error: null,
    isPending: false,
  },
};

const SiteReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    // Get all sites.
    case SITE.GET_SITES_FULFILLED: {
      const sites = {
        ...state.sites,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, sites };
    }

    case SITE.GET_SITES_PENDING: {
      const sites = {
        ...state.sites,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, sites };
    }

    case SITE.GET_SITES_REJECTED: {
      const sites = {
        ...state.sites,
        data: null,
        error: payload.data.msg,
        isPending: false,
      };
      return { ...state, sites };
    }

    default: {
      return state;
    }
  }
};

export { INITIAL_STATE, SiteReducer };
