import React from 'react';
import { Result, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { logoutAction } from '@actions';

export const tokenExpired = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    logoutAction(dispatch);
  };

  return (
    <Result
      status="warning"
      title="Your token is expired, please login again"
      extra={
        <Button type="primary" href="/" onClick={handleClick}>
          Sign in
        </Button>
      }
    />
  );
};
