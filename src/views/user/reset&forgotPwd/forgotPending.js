import React from 'react';
import { Result, Button } from 'antd';

export const ForgotPendingView = () => {
  return (
    <Result
      status="success"
      title="Reset password link has been sent to your email!"
      subTitle="Din't receive email?"
      extra={[
        <Button
          type="primary"
          style={{ width: '150px' }}
          key="send"
          href="/user/forgotPwd"
        >
          Send Again
        </Button>,
        <Button key="back" style={{ width: '150px' }} href="/">
          Sign in
        </Button>,
      ]}
    />
  );
};
