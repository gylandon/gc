import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

export const unauthorized = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={handleClick}>
          Go Back
        </Button>
      }
    />
  );
};
