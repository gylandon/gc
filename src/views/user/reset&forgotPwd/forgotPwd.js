import React, { useState } from 'react';
import { Form, Input, Button, Card, Spin, Divider } from 'antd';
import { Header } from '@header';
import { account as API } from '@api';
import { codeResponse, ToastContainer, loading } from '@utils';
import { useHistory } from 'react-router-dom';
import styles from './reset&forgot.less';

export const ForgotView = () => {
  const history = useHistory();
  const [isLoading, setloading] = useState(false);
  const [btnDisabled, setbtnDisabled] = useState(false);

  const onFinish = async (email) => {
    setloading(true);
    setbtnDisabled(true);
    localStorage.setItem('email', email.email);
    const { data } = await API.forgotPwd(email.email);
    if (data.code == 200) {
      setloading(false);
      history.push('/user/forgotPending');
    } else {
      codeResponse(data.code);
    }
  };

  return (
    <Spin indicator={loading} spinning={isLoading} tip="loading">
      <Header />
      <Divider className={styles.divider} />
      <ToastContainer style={{ width: '30vw' }} />
      <div className={styles.container}>
        <Card bordered={true} className={styles.card}>
          <Form
            name="forgot"
            onFinish={onFinish}
            scrollToFirstError
            className={styles.form}
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
              className={styles.formItem}
            >
              <Input placeholder="Input E-mail" />
            </Form.Item>
            <Form.Item className={styles.formItem}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.btn}
                size="large"
                disabled={btnDisabled}
              >
                Send Email
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  );
};
