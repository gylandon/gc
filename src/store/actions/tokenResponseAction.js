import React from 'react';
import { AUTH } from '@types';

export const tokenExpiredAction = (dispatch) => {
  dispatch({
    type: AUTH.TOKEN_EXPIRED,
    payload: {
      signed: false,
      status: TOKEN_EXPIRED,
    },
  });
};

export const notFoundAction = (dispatch) => {
  dispatch({
    type: AUTH.NOT_FOUND,
    payload: {
      status: NOT_FOUND,
    },
  });
};

export const unAuthorizedAction = (dispatch) => {
  dispatch({
    type: AUTH.UNAUTHORIZED,
    payload: {
      status: UNAUTHORIZED,
    },
  });
};

export const serverErr = (dispatch) => {
  dispatch({
    type: AUTH.SERVICER_ERR,
    payload: {
      status: SERVER_ERR,
    },
  });
};
