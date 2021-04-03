import { AUTH } from '@types';

export const loginSuccess = (dispatch, data) => {
  dispatch({
    type: AUTH.LOGIN_SUCCESS,
    payload: {
      data: data,
      signed: true,
      status: AUTH.LOGIN_SUCCESS,
    },
  });
};

export const loginPending = (dispatch, data) => {
  dispatch({
    type: AUTH.LOGIN_PENDING,
    payload: {
      signed: false,
      status: AUTH.LOGIN_PENDING,
      data: data,
    },
  });
};

export const loginProcessing = (dispatch, data) => {
  dispatch({
    type: AUTH.LOGIN_PROCESSING,
    payload: {
      signed: false,
      status: AUTH.LOGIN_PROCESSING,
      data: data,
    },
  });
};

export const loginReject = (dispatch, data) => {
  dispatch({
    type: AUTH.LOGIN_REJECT,
    payload: {
      signed: false,
      status: AUTH.LOGIN_REJECT,
      data: data,
    },
  });
};
