import { USERS } from '@types';

const INITIAL_STATE = {
  // All customers.
  customers: {
    data: null,
    error: null,
    isPending: false,
  },
};

const UsersReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    // Get all customers.
    case USERS.GET_CUSTOMERS_FULFILLED: {
      const customers = {
        ...state.customers,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, customers };
    }

    case USERS.GET_CUSTOMERS_PENDING: {
      const customers = {
        ...state.customers,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, customers };
    }

    case USERS.GET_CUSTOMERS_REJECTED: {
      const customers = {
        ...state.customers,
        data: null,
        error: payload.data.msg,
        isPending: false,
      };
      return { ...state, customers };
    }

    default: {
      return state;
    }
  }
};

export { INITIAL_STATE, UsersReducer };
