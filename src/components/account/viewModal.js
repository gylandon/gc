import React, { useEffect } from 'react';
import { Modal, Form, Divider, Checkbox, Radio, Select } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { AiOutlineMail } from 'react-icons/ai';
import { FaRegBuilding } from 'react-icons/fa';
import styles from './edit.less';
import { useSelector, useDispatch } from 'react-redux';
import { accountAction } from '@actions/index';

export const ViewModal = ({ visible, onCreate, onCancel, title, id }) => {
  const [form] = Form.useForm();
  const accData = useSelector((state) => state.account.currentAccount);
  const allData = useSelector((state) => state.account.accounts.data)
  const dispatch = useDispatch();
  
  let data = {};

  useEffect(() =>{
    dispatch(accountAction.getType())
  }, [])

  let type = useSelector(state => state.account.type.data)

  if(visible){
    if (accData.data) {
      data = accData.data; 
      let temp = type.filter(item =>{
        return item.dataId == data.businessType
      })
      data.businessType = temp[0].categoryName
      console.log(data)
    }
  }

  useEffect(() => {
    form.resetFields();
  }, [data]);

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 17,
    },
  };

  const onCreateClick = (values) => {
    onCreate(values);
  };

  const onCancelClick = () => {
    onCancel();
    form.resetFields();
  };

  const mainBody = () => {
    return (
      <Modal
        visible={visible}
        title={title}
        okText="Confirm"
        closable={true}
        destroyOnClose={true}
        cancelText="Cancel"
        onCancel={onCancelClick}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreateClick(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        {Array.isArray(data.roles) && (
          <Form
            form={form}
            name="Edit"
            initialValues={{
              enabled: data.enabled,
            }}
          >
            <Form.Item
              {...layout}
              name="email"
              label="Email Address"
              labelAlign="left"
            >
              <span className={styles.spanStyle}>
                <AiOutlineMail size="20" style={{ marginRight: '7px' }} />
                {data.email}
              </span>
            </Form.Item>

            <Form.Item
              {...layout}
              name="name"
              label="Name"
              labelAlign="left"
              className={styles.listItem}
            >
              <span className={styles.spanStyle}>
                <UserOutlined size="20" style={{ marginRight: '7px' }} />
                {data.name}
              </span>
            </Form.Item>

            <Form.Item
              {...layout}
              name="phone"
              label="Phone"
              labelAlign="left"
              className={styles.listItem}
            >
              <span className={styles.spanStyle}>
                <PhoneOutlined size="20" style={{ marginRight: '7px' }} />
                {`+${data.phone}`}
              </span>
            </Form.Item>

            <Divider className={styles.divider} />

            <Form.Item
              wrapperCol="20"
              labelCol="6"
              name="role"
              label="Role"
              labelAlign="left"
              style={{ textAlign: 'center' }}
            >
              <Radio.Group>
                <Radio
                  checked={data.roles[0].rid === 1 ? true : false}
                  value={1}
                >
                  Customer
                </Radio>
                <Radio
                  checked={data.roles[0].rid === 4 ? true : false}
                  value={4}
                >
                  Admin
                </Radio>
                <Radio
                  checked={data.roles[0].rid === 2 ? true : false}
                  value={2}
                >
                  Driver
                </Radio>
                <Radio
                  checked={data.roles[0].rid === 3 ? true : false}
                  value={3}
                >
                  Processor
                </Radio>
              </Radio.Group>
            </Form.Item>

            {data.roles[0].rid === 1 ? (
              <div>
                <Form.Item>
                  <h2 style={{ marginBottom: '20px', color: '#019638', textAlign:'center' }}>
                    Locations
                  </h2>
                </Form.Item>

                <Form.Item>
                  {data.sites.map((site, index) => (
                    <div key={index} className={styles.siteContainer}>
                      <div>
                        <Form.Item
                          {...layout}
                          label={`Site name${index + 1}`}
                          labelAlign="left"
                        >
                          <span className={styles.spanStyle}>
                            <FaRegBuilding
                              size="20"
                              style={{ marginRight: '7px' }}
                            />
                            {site.name}
                          </span>
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item
                          {...layout}
                          label={`Address${index + 1}`}
                          labelAlign="left"
                        >
                          <span className={styles.spanStyle}>
                            <FaRegBuilding
                              size="20"
                              style={{ marginRight: '7px' }}
                            />
                            {site.location}
                          </span>
                        </Form.Item>
                      </div>
                      {index != data.sites.length - 1 ? (
                        <Divider className={styles.divider} />
                      ) : null}
                    </div>
                  ))}
                </Form.Item>
                <Divider className={styles.divider} />
                <Form.Item
                  {...layout}
                  name="type"
                  label="Business Type"
                  labelAlign="left"
                >
                  <span className={styles.spanStyle}>
                    {data.businessType}
                  </span>
                </Form.Item>  
              </div>
            ) : null}

            <Form.Item
              {...layout}
              labelAlign="left"
              name="enabled"
              label="Enabled"
              valuePropName="checked"
            >
              <Checkbox style={{ marginLeft: '50px' }} />
            </Form.Item>
          </Form>
        ) }
      </Modal>
    );
  };

  return <div>{mainBody()}</div>;
};
