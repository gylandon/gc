import React from 'react';
import { Result, Button } from 'antd';
import { useHistory } from 'react-router-dom';

export const serverErr = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={handleClick}>
          Go Back
        </Button>
      }
    />
  );
};
