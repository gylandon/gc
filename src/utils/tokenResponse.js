import React from 'react';
import {
  tokenExpiredAction,
  notFoundAction,
  unAuthorizedAction,
} from '@actions';

const tokenResponse = (token, dispatch, history) => {
  if (token == 401) {
    tokenExpiredAction(dispatch);
    history.push('/401');
  } else if (token == 403) {
    unAuthorizedAction(dispatch);
    history.push('/403');
  } else if (token == 404) {
    notFoundAction(dispatch);
    history.push('/404');
  } else if (token == 500) {
    notFoundAction(dispatch);
    history.push('/500');
  }
};

export { tokenResponse };
