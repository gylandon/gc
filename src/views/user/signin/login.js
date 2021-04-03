import { Card, Form, Input, Button, Checkbox, Divider, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { account as API } from '@api';
import {
  codeResponse,
  ToastContainer,
  loading,
  setAuthorizationToken,
} from '@utils';
import styles from './login.less';
import { Header } from '@header';
import {
  loginPending,
  loginProcessing,
  loginSuccess,
  loginReject,
} from '@actions';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

export const LoginView = () => {
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies(['remember']);
  const [isLoading, setloading] = useState(false);
  const [field, setField] = useState([
    {
      name: ['email'],
      value: '',
    },
  ]);
  const [btnDisabled, setbtnDisabled] = useState(false);

  useEffect(() => {
    if (cookies.remember !== undefined) {
      setField([
        {
          name: ['email'],
          value: cookies.remember,
        },
      ]);
    }
  }, []);

  const onFinish = async ({ email, password, remember }) => {
    loginPending(dispatch, {});
    setloading(true);
    const { data } = await API.login(email, password);
    loginProcessing(dispatch, {});
    setloading(false);
    setbtnDisabled(true);
    if (data.code == '200') {
      if (remember) {
        const expireDate = Date.now();
        const options = {
          path: '/',
          expire: expireDate + 7 * 24 * 60 * 60 * 1000,
        };
        setCookie('remember', email, options);
      } else {
        removeCookie('remember');
      }
      codeResponse(data.code, 'signin');
      setTimeout(function(){
        loginSuccess(dispatch, data.data);
      }, 1000)
      
    } else {
      loginReject(dispatch, {});
      codeResponse(data.code, 'signin');
      setbtnDisabled(false);
    }
  };

  return (
    <Spin indicator={loading} spinning={isLoading} tip="logging in">
      <div style={{ width: '100vw' }}>
        <Header />
        <ToastContainer style={{ width: '30vw' }} />
        <Divider className={styles.divider} />
        <div className={styles.container}>
          <Card
            className={styles.cardLeft}
            cover={
              <img
                alt="Green Collect Login Page"
                src="https://images.squarespace-cdn.com/content/v1/561dc817e4b09810cb60fb39/1575946280686-RS6711Q5RIR9ZYO8S15O/ke17ZwdGBToddI8pDm48kCE_kl7Sp4fB-maDwIvtgSR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hGaawTDWlunVGEFKwsEdnE8MoPLnv881anZkFJbb6VXDUtFRDnBrxHwc5vcTujlQg/Social+Enterprise+of+Year+trophy.jpg"
              />
            }
          />
          <Card bordered={true} className={styles.cardRight}>
            <Form
              name="login"
              initialValues={{
                remember: true,
              }}
              fields={field}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email address or Name.',
                  },
                ]}
                className={styles.form}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Email Address or Name"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password.',
                  },
                ]}
                className={styles.form}
              >
                <Input
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <div className={styles.remeberForgetContainer}>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  className={styles.remember}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item name="forgetPassword" className={styles.remember}>
                  <a href="/user/forgotPwd">Forgot Password</a>
                </Form.Item>
              </div>
              <Divider className={styles.divider} />
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.btn}
                  size="large"
                  disabled={btnDisabled}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </Spin>
  );
};
