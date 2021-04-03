import { ACCOUNT } from '@types';

const INITIAL_STATE = {
  accounts: {
    data: null,
    error: null,
    isPending: false,
  },

  currentAccount: {
    data: [
      {
        email: '',
        name: '',
        username: '',
        role: 0,
        phone: '',
        prefix: '',
        enabled: false,
        businessType: 0,
        sites: [{ name: '', location: '' }],
      },
    ],
    error: null,
    isPending: false,
  },

  creatingAccount: {
    data: null,
    error: null,
    isPending: false,
  },

  deletingAccount: {
    data: null,
    error: null,
    isPending: false,
  },

  newAccId: {
    data: null,
    error: null,
    isPending: false,
  },
  type: {
    data: null,
    error: null,
    isPending: false,
  },
};

const AccountReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACCOUNT.GET_ACCOUNTS_FULFILLED: {
      const accounts = {
        ...state.accounts,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, accounts };
    }

    case ACCOUNT.GET_ACCOUNTS_PENDING: {
      const accounts = {
        ...state.accounts,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, accounts };
    }

    case ACCOUNT.GET_ACCOUNTS_REJECTED: {
      const accounts = {
        ...state.accounts,
        data: null,
        error: payload.data,
        isPending: false,
      };
      return { ...state, accounts };
    }

    case ACCOUNT.GET_TYPE_FULFILLED: {
      const type = {
        ...state.type,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, type };
    }

    case ACCOUNT.GET_TYPE_PENDING: {
      const type = {
        ...state.type,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, type };
    }

    case ACCOUNT.GET_TYPE_REJECTED: {
      const type = {
        ...state.type,
        data: null,
        error: payload.data.msg,
        isPending: false,
      };
      return { ...state, type };
    }

    case ACCOUNT.GET_ACCOUNT_FULFILLED: {
      const currentAccount = {
        ...state.currentAccount,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, currentAccount };
    }

    case ACCOUNT.GET_ACCOUNT_PENDING: {
      const currentAccount = {
        ...state.currentAccount,
        error: null,
        isPending: true,
      };
      return { ...state, currentAccount };
    }

    case ACCOUNT.GET_ACCOUNT_REJECTED: {
      const currentAccount = {
        ...state.currentAccount,
        error: payload.data.msg,
        isPending: false,
      };
      return { ...state, currentAccount };
    }

    case ACCOUNT.UPDATE_STATUS_FULFILLED: {
      const currentAccount = {
        ...state.currentAccount,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, currentAccount };
    }

    case ACCOUNT.UPDATE_STATUS_PENDING: {
      const currentAccount = {
        ...state.currentAccount,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, currentAccount };
    }

    case ACCOUNT.UPDATE_STATUS_REJECTED: {
      const currentAccount = {
        ...state.currentAccount,
        data: null,
        error: payload.data.msg,
        isPending: false,
      };
      return { ...state, currentAccount };
    }

    case ACCOUNT.UPDATE_ROLE_FULFILLED: {
      const currentAccount = {
        ...state.currentAccount,
        data: payload.data.data,
        error: null,
        isPending: false,
      };
      return { ...state, currentAccount };
    }

    case ACCOUNT.UPDATE_ROLE_PENDING: {
      const currentAccount = {
        ...state.currentAccount,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, currentAccount };
    }

    case ACCOUNT.UPDATE_ROLE_REJECTED: {
      const currentAccount = {
        ...state.currentAccount,
        data: null,
        error: payload.data.msg,
        isPending: false,
      };
      return { ...state, currentAccount };
    }

    case ACCOUNT.CREATE_ACCOUNT_FULFILLED: {
      const newAccId = {
        ...state.newAccId,
        data: payload.data,
        error: null,
        isPending: false,
      };
      return { ...state, newAccId };
    }

    case ACCOUNT.CREATE_ACCOUNT_PENDING: {
      const newAccId = {
        ...state.newAccId,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, newAccId };
    }

    case ACCOUNT.CREATE_ACCOUNT_REJECTED: {
      const newAccId = {
        ...state.newAccId,
        data: null,
        error: payload.data,
        isPending: false,
      };
      return { ...state, newAccId };
    }

    case ACCOUNT.DELETE_ACCOUNT_FULFILLED: {
      const deletingAccount = {
        ...state.deletingAccount,
        data: payload.data,
        error: null,
        isPending: false,
      };
      return { ...state, deleteAccount: deletingAccount };
    }

    case ACCOUNT.DELETE_ACCOUNT_PENDING: {
      const deletingAccount = {
        ...state.deletingAccount,
        data: null,
        error: null,
        isPending: true,
      };
      return { ...state, deleteAccount: deletingAccount };
    }

    case ACCOUNT.DELETE_ACCOUNT_REJECTED: {
      const deletingAccount = {
        ...state.deletingAccount,
        data: null,
        error: payload.data,
        isPending: false,
      };
      return { ...state, deleteAccount: deletingAccount };
    }

    case ACCOUNT.RESET_ACCOUNT: {
      const currentAccount = {
        ...state.currentAccount,
        data: null,
      };
      return { ...state, currentAccount };
    }

    default: {
      return state;
    }
  }
};

export { INITIAL_STATE, AccountReducer };
