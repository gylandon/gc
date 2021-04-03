import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Checkbox,
  Radio,
  Space,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { AiOutlineMail } from 'react-icons/ai';
import { FaRegBuilding } from 'react-icons/fa';
import React from 'react';
import { account as API } from '@api';
import { codeResponse, ToastContainer } from '@utils';
import inStyle from '../signin/login.less';
import upStyle from './signup.less';
import { Header } from '@header';

import { useHistory } from 'react-router-dom';

export const SignupView = () => {
  const history = useHistory();
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 17,
    },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="61">+61</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = async ({
    email,
    password,
    name,
    username,
    prefix,
    phone,
    altLocation,
    role,
    enabled,
  }) => {
    const realLo = [];

    if (Array.isArray(altLocation)) {
      altLocation.map((item, index) => {
        const cur = {
          siteId: `S0${index + 1}`,
          name: item.sName,
          location: item.site,
        };
        realLo.push(cur);
      });
    }

    const data = {
      email,
      password,
      name,
      username: name,
      phone: `${prefix}${phone}`,
      sites: realLo,
      role,
      enabled,
    };
    const response = await API.signup(data);
    codeResponse(response.code, 'signup');
    if (response.code == 200) {
      const id = setTimeout(() => {
        history.goBack();
      }, 1000);
    }
  };

  return (
    <div style={{ width: '100vw' }}>
      <Header />
      <ToastContainer />
      <Divider className={inStyle.divider} />
      <div className={inStyle.container}>
        <Card
          className={inStyle.cardLeft}
          cover={
            <img
              alt="Green Collect Sign up Page"
              src="https://images.squarespace-cdn.com/content/v1/561dc817e4b09810cb60fb39/1575946280686-RS6711Q5RIR9ZYO8S15O/ke17ZwdGBToddI8pDm48kCE_kl7Sp4fB-maDwIvtgSR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hGaawTDWlunVGEFKwsEdnE8MoPLnv881anZkFJbb6VXDUtFRDnBrxHwc5vcTujlQg/Social+Enterprise+of+Year+trophy.jpg"
            />
          }
        />
        <Card bordered={true} className={inStyle.cardRight}>
          <Form
            name="Sign up"
            initialValues={{
              prefix: '61',
            }}
            onFinish={onFinish}
          >
            <Form.Item
              {...layout}
              name="email"
              label="Email Address"
              labelAlign="left"
              className={upStyle.listItem}
              rules={[
                {
                  type: 'email',
                  message: 'The input is not a valid email address.',
                },
                {
                  required: true,
                  message: 'Please input email.',
                },
              ]}
            >
              <Input prefix={<AiOutlineMail size="20" />} />
            </Form.Item>

            <Form.Item
              {...layout}
              name="password"
              label="Password"
              labelAlign="left"
              className={upStyle.listItem}
              rules={[
                {
                  required: true,
                  message: 'Please input your password.',
                },
              ]}
            >
              <Input prefix={<LockOutlined size="20" />} type="password" />
            </Form.Item>

            <Form.Item
              {...layout}
              name="name"
              label="Name"
              labelAlign="left"
              className={upStyle.listItem}
              rules={[
                {
                  required: true,
                  message: 'Please input the member name.',
                },
              ]}
            >
              <Input prefix={<UserOutlined size="20" />} />
            </Form.Item>

            <Form.Item
              {...layout}
              name="phone"
              label="Phone"
              labelAlign="left"
              className={upStyle.listItem}
              rules={[
                {
                  validator: (_, value) =>
                    value == '' || !isNaN(value)
                      ? Promise.resolve()
                      : Promise.reject(
                          'The input is not a valid phone number.'
                        ),
                },
                {
                  required: true,
                  message: 'Please input phone number.',
                },
              ]}
            >
              <Input addonBefore={prefixSelector} placeholder="phone" />
            </Form.Item>

            <Divider className={upStyle.divider} />
            <Form.Item>
              <h2 style={{ marginBottom: '20px', color: '#019638' }}>
                Location Management
              </h2>
            </Form.Item>

            <Form.List {...layout} name="altLocation">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map((field) => (
                      <Space key={field.key} className={upStyle.fieldContainer}>
                        <div
                          className={upStyle.deleteContainer}
                          style={{ marginRight: '-8px' }}
                        >
                          <Form.Item
                            {...field}
                            {...layout}
                            style={{ width: '100%' }}
                            name={[field.name, 'sName']}
                            label="Site name"
                            labelAlign="left"
                            fieldKey={[field.fieldKey, 'sName']}
                            rules={[
                              { required: true, message: 'Missing site name' },
                            ]}
                          >
                            <Input
                              style={{ width: '90%', float: 'left' }}
                              prefix={
                                <FaRegBuilding
                                  size="20"
                                  style={{ marginRight: '7px' }}
                                />
                              }
                            />
                          </Form.Item>
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </div>
                        <div className={upStyle.deleteContainer}>
                          <Form.Item
                            {...field}
                            {...layout}
                            style={{ width: '100%' }}
                            name={[field.name, 'site']}
                            label="Address"
                            labelAlign="left"
                            fieldKey={[field.fieldKey, 'site']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing site address',
                              },
                            ]}
                          >
                            <Input
                              style={{ width: '90%', float: 'left' }}
                              prefix={
                                <FaRegBuilding
                                  size="20"
                                  style={{ marginRight: '7px' }}
                                />
                              }
                            />
                          </Form.Item>
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </div>
                      </Space>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                        className={upStyle.btn}
                      >
                        <PlusOutlined /> Add field
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
            <Divider className={upStyle.divider} />
            <Form.Item
              wrapperCol="23"
              labelAlign="left"
              name="enabled"
              label="Enabled"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: 'Please claim the availability for this account',
                },
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          'Please claim the availability for this account'
                        ),
                },
              ]}
            >
              <Checkbox />
            </Form.Item>
            <Divider className={upStyle.divider} />
            <Form.Item
              wrapperCol="18"
              labelCol="6"
              name="role"
              label="Role"
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: 'Please assign a role to this account.',
                },
              ]}
            >
              <Radio.Group>
                <Radio value="1">Customer</Radio>
                <Radio value="4">Admin</Radio>
                <Radio value="2">Driver</Radio>
                <Radio value="3">Processor</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol="23">
              <Button
                type="primary"
                htmlType="submit"
                className={inStyle.btn}
                size="large"
              >
                Sign up
              </Button>
            </Form.Item>
            <Form.Item wrapperCol="23">
              <a href="">Help</a>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};
