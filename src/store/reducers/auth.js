import { AUTH } from '@types';

const initalState = [
  {
    data: {},
    status: '',
    signed: false,
  },
];

const AuthReducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH.LOGIN_PENDING:
    case AUTH.LOGIN_PROCESSING:
    case AUTH.LOGIN_REJECT:
      return [
        {
          data: payload.data,
          signed: payload.signed,
          status: payload.status,
        },
      ];
    case AUTH.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.data.token);
      return [
        {
          data: payload.data,
          signed: payload.signed,
          status: payload.status,
        },
      ];
    case AUTH.LOGOUT_ACTION:
      localStorage.removeItem('token');
      return [
        {
          data: payload.data,
          signed: payload.signed,
          status: payload.status,
        },
      ];
    case AUTH.TOKEN_EXPIRED:
      return [
        {
          data: {},
          signed: payload.signed,
          status: payload.status,
        },
      ];
    case AUTH.NOT_FOUND:
      return [
        ...state,
        {
          status: payload.status,
        },
      ];
    case AUTH.UNAUTHORIZED:
      return [
        ...state,
        {
          status: payload.status,
        },
      ];
    case AUTH.SERVER_ERR:
      return [
        ...state,
        {
          status: payload.status,
        },
      ];
    default:
      return state;
  }
  return state;
};

export { AuthReducer };
