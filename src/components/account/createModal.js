import React, { useState, useEffect } from 'react';
import {
  Modal,
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
import { accountAction } from '@actions/index';
import { AiOutlineMail } from 'react-icons/ai';
import { FaRegBuilding } from 'react-icons/fa';
import styles from './edit.less';
import { useSelector, useDispatch } from 'react-redux';

export const createModal = (
  { visible, onCreate, setVisible, title },
  initialValues
) => {
  const [form] = Form.useForm();
  const [display, setDisplay] = useState('none');
  const { Option } = Select;

  const dispatch = useDispatch();
  useEffect(() =>{
    dispatch(accountAction.getType())
  }, [])

  let type = useSelector(state => state.account.type.data)
  

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="61">+61</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 17,
    },
  };

  const handleChange = (e) => {
    if (parseInt(e.target.value, 10) === 1) {
      setDisplay('block');
    } else {
      setDisplay('none');
    }
  };

  const onCancelClick = () => {
    setVisible(false);
    setDisplay('none');
    form.resetFields(), [initialValues];
  };

  return (
    <Modal
      visible={visible}
      title={title}
      okText="Confirm"
      cancelText="Cancel"
      onCancel={onCancelClick}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            setDisplay('none');
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name="Sign up"
        initialValues={{
          prefix: '61',
        }}
      >
        <Form.Item
          {...layout}
          name="email"
          label="Email Address"
          labelAlign="left"
          className={styles.listItem}
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
          className={styles.listItem}
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
          className={styles.listItem}
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
          className={styles.listItem}
          rules={[
            {
              validator: (_, value) =>
                value == '' || !isNaN(value)
                  ? Promise.resolve()
                  : Promise.reject('The input is not a valid phone number.'),
            },
            {
              required: true,
              message: 'Please input phone number.',
            },
          ]}
        >
          <Input addonBefore={prefixSelector} placeholder="phone" />
        </Form.Item>

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
          <Radio.Group onChange={handleChange}>
            <Radio value={1}>Customer</Radio>
            <Radio value={4}>Admin</Radio>
            <Radio value={2}>Driver</Radio>
            <Radio value={3}>Processor</Radio>
          </Radio.Group>
        </Form.Item>

        <div style={{ display: display }}>
          <Divider className={styles.divider} />
          <Form.Item>
            <h2 style={{ marginBottom: '20px', color: '#019638' }}>
              Site Management
            </h2>
          </Form.Item>
          <Form.List {...layout} name="sites">
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field) => (
                    <Space key={field.key} className={styles.fieldContainer}>
                      <div
                        className={styles.deleteContainer}
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
                            {
                              required: display === 'block' ? true : false,
                              message: 'Missing site name',
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
                      <div className={styles.deleteContainer}>
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
                              required: display === 'block' ? true : false,
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

                  <Form.Item style={{textAlign:"center"}}>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      block
                      className={styles.btn}
                    >
                      <PlusOutlined /> Add a site
                    </Button>
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
          <Form.Item 
            {...layout}
            name="type"
            label="Business Type"
            labelAlign="left" 
            rules={[
              { 
                required: display === 'block' ? true : false,
                message: "Please select the business type"
              }
              
            ]}
          >
            <Select >
              {
                Array.isArray(type) && type.map(item =><Option key={item.dataId}>{item.categoryName}</Option>)
              }
            </Select>
          </Form.Item>
        </div>

        <Divider className={styles.divider} />
        <Form.Item
          style={{textAlign:"center"}}
          labelAlign="left"
          name="enabled"
          label="Enabled"
          valuePropName="checked"
        >
          <Checkbox style={{marginRight:"50px"}}/>
        </Form.Item>
        <Divider className={styles.divider} />
      </Form>
    </Modal>
  );
};
