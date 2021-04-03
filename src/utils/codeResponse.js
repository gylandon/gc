import { toastify } from './toastify';
import React from 'react';

const codeResponse = (code, operation) => {
  console.log(code, operation);
  if (code == 200) {
    if (operation == 'signup') {
      return toastify.toastSuccess('Signing up...');
    } else if (operation == 'signin') {
      return toastify.toastSuccess('Logging in...');
    } else if (operation == 'reset') {
      return toastify.toastSuccess('Password changed...');
    } else if (operation == 'modify') {
      return toastify.toastSuccess('Profile modified!');
    }
  } else if (code == 1000) {
    return toastify.toastError('Unmatched email address.');
  } else if (code == 1001) {
    return toastify.toastError('Wrong email or password.');
  } else if (code == 1002) {
    return toastify.toastError('User is not enabled.');
  } else if (code == 1003) {
    return toastify.toastError('Email address is already been registered.');
  } else if (code == 1004) {
    return toastify.toastInfo("Sorry, You don't have any collection data yet");
  } else if (code == 1005 || code == 1006) {
    return toastify.toastError(
      'Sorry, Something wrong happened. We cannot proceed your request. Please try later'
    );
  }
};

export { codeResponse };
