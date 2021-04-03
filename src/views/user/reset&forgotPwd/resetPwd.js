import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Spin, Divider, notification } from 'antd';
import { codeResponse, ToastContainer, loading } from '@utils';
import styles from './reset&forgot.less';
import { useLocation } from 'react-router-dom';
import { Header } from '@header';
import { account as API } from '@api';
import { useHistory } from 'react-router-dom';

export const ResetView = () => {
  const [token, setToken] = useState('');
  const [isLoading, setloading] = useState(false);
  const [btnDisabled, setbtnDisabled] = useState(false);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.search.split('=')[1] != undefined) {
      setToken(location.search.split('=')[1]);
    }
  }, []);

  const onFinish = async (res) => {
    setloading(true);
    setbtnDisabled(true);

    const { data } = await API.resetPwd(res.password, res.email, token);
    setloading(false);
    codeResponse(data.code, 'reset');
    if (data.code == 200) {
      const id = setTimeout(() => {
        history.push('/');
      }, 2000);
    } else {
      setbtnDisabled(false);
    }
  };

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 17,
    },
  };

  return (
    <Spin indicator={loading} spinning={isLoading} tip="loading">
      <Header />
      <ToastContainer style={{ width: '30vw' }} />
      <Divider className={styles.divider} />
      <div className={styles.container}>
        <Card bordered={true} className={styles.card}>
          <h3 style={{ marginBottom: '1.5em' }}>Reset password</h3>
          <Form
            name="reset"
            onFinish={onFinish}
            scrollToFirstError
            className={styles.form}
          >
            <Form.Item
              {...layout}
              name="email"
              label="E-mail"
              labelAlign="left"
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
              <Input />
            </Form.Item>
            <Form.Item
              {...layout}
              name="password"
              label="New Password"
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
              className={styles.formItem}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              {...layout}
              name="confirm"
              label="Confirm Password"
              labelAlign="left"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  },
                }),
              ]}
              className={styles.formItem}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item className={styles.formItem}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.btn}
                size="large"
                disabled={btnDisabled}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Spin>
  );
};
