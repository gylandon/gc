import React, { useEffect, useState } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Divider,
  Tooltip,
  Spin,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { profile as API, site as siteAPI } from '@api';
import { codeResponse, ToastContainer, loading } from '@utils';
import styles from './accprofile.less';
import { HeaderLogged } from '@header';
import { AiOutlineMail } from 'react-icons/ai';
import { FaRegBuilding } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { SiteModal } from './modal';
import { profileAction as ACTIONS, accountAction } from '@actions';
import {
  MinusCircleOutlined,
  PlusOutlined,
  FormOutlined,
  CheckSquareOutlined,
} from '@ant-design/icons';

export const AccountProfileView = (props) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 17,
    },
  };
  const dispatch = useDispatch();
  const { Option } = Select;
  const userInfo = useSelector((state) => state.auth);
  const role = userInfo[0].data.role[0].roleName;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Select.Option value="61">+61</Select.Option>
        <Select.Option value="86">+86</Select.Option>
      </Select>
    </Form.Item>
  );

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [sites, setSite] = useState([]);
  const [isLoading, setloading] = useState(false);
  const [occupied, setOccupied] = useState(false);
  const [warning, setWarning] = useState('none');
  const [siteAbled, setSiteAbled] = useState([]);
  const [visible, setVisible] = useState(false);
  const [siteDisplay, setSiteDisplay] = useState('none');

  const ondelete = async (sid) => {
    const remained = sites.filter((site) => site.sid != sid);
    setSite(remained);
    await siteAPI.deleteSite(sid);
  };

  const onCreate = async (values) => {
    setVisible(false);
    const curr = {
      name: values.newName,
      location: values.newAddress,
    };
    const res = await siteAPI.addSite(curr);
    if (res.data.code == 200) {
      curr.sid = res.data.data.sid;
      curr.disabled = true;
      const cur = [];
      cur.push(curr);
      setSite([...sites, ...cur]);
    } else {
      codeResponse(res.data.code, signup);
    }
  };

  useEffect(() => {
    (async function fetchPro() {
      const res = await API.fetchPro();
      res.data.data.prefix = res.data.data.phone.slice(0, 2);
      res.data.data.phone = res.data.data.phone.slice(2);
      setData(res.data.data);
      console.log(res.data.data)
      if (res.data.data.roles[0].rid === 1) {
        setSiteDisplay('block');
      }
    })();
    form.resetFields(), [props.initialValues];
    dispatch(accountAction.getType())

    Array.isArray(data.sites)
      ? data.sites.map((item) => {
          const curr = {
            location: item.location,
            sid: item.sid,
            name: item.name,
            disabled: true,
          };
          const prevSite = sites;
          prevSite.push(curr);
          setSite(prevSite);
          form.setFieldsValue({
            type: `${data.businessType}`
          })
        })
      : null;
  }, [data.email]);

  const type = useSelector(state => state.account.type.data)

  const onChange = (index, e) => {
    const tempSite = [...sites];
    const name = e.target.name;
    name === 'location'
      ? (tempSite[index].location = e.target.value)
      : (tempSite[index].name = e.target.value);
    setSite(tempSite);
  };

  const ontoggled = (index) => {
    const tempSite = [...sites];
    tempSite[index].disabled = !tempSite[index].disabled;
    setSiteAbled(tempSite[index].disabled);
    setSite(tempSite);
  };

  const onUpdateSite = async (site) => {
    const res = await siteAPI.updateSite(site);
    codeResponse(res.status);
    setOccupied(false);
  };

  const onFinish = async (values) => {
    ACTIONS.profilePending(dispatch);
    setloading(true);
    const phone = `${values.prefix}${values.phone}`;
    const data = {
      email: values.email,
      phone,
      name: values.name,
      businessType: role!== 'ROLE_customer' ? 10 :parseInt(values.type, 10) 
    };
    console.log(data)
    const res = await API.updateBasic(data);
    if (res.status == 200) {
      codeResponse(res.data.code, 'modify');
      if (res.data.code == 200) {
        userInfo[0].data.email = data.email;
        userInfo[0].data.phone = data.phone;
        userInfo[0].data.name = data.name;
        ACTIONS.profileSuccess(dispatch, userInfo[0].data);
        setloading(false);
      } else {
        ACTIONS.profileReject(dispatch);
      }
    } else ACTIONS.profileReject(dispatch);
  };

  return (
    <Spin indicator={loading} spinning={isLoading} tip="logging in">
      <div style={{ width: '100vw' }}>
        <HeaderLogged />
        <ToastContainer />
        <div className={styles.container}>
          <Card
            className={styles.cardLeft}
            cover={
              <img
                alt="Green Collect Sign up Page"
                src="https://images.squarespace-cdn.com/content/v1/561dc817e4b09810cb60fb39/1575946280686-RS6711Q5RIR9ZYO8S15O/ke17ZwdGBToddI8pDm48kCE_kl7Sp4fB-maDwIvtgSR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hGaawTDWlunVGEFKwsEdnE8MoPLnv881anZkFJbb6VXDUtFRDnBrxHwc5vcTujlQg/Social+Enterprise+of+Year+trophy.jpg"
              />
            }
          />
          <Card bordered={true} className={styles.cardRight}>
            <Form
              form={form}
              name="profile"
              initialValues={{
                email: data.email,
                username: data.username,
                name: data.name,
                prefix: data.prefix,
                phone: data.phone,
              }}
              style={{ padding: '24px' }}
              onFinish={onFinish}
            >
              <Form.Item>
                <h1 style={{ marginBottom: '20px' }}>
                  {role != 'ROLE_customer'
                    ? 'Personal Profile'
                    : 'Organizational Profile'}
                </h1>
              </Form.Item>

              <Form.Item
                {...layout}
                name="email"
                label="Email Address"
                labelAlign="left"
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
                <Input
                  prefix={
                    <AiOutlineMail size="20" style={{ marginRight: '7px' }} />
                  }
                />
              </Form.Item>

              {role == 'ROLE_customer' ? (
                <Form.Item
                  {...layout}
                  name="name"
                  label="Organizational name"
                  labelAlign="left"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: 'Please input the organization name here.',
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <FaRegBuilding size="20" style={{ marginRight: '7px' }} />
                    }
                  />
                </Form.Item>
              ) : (
                <Form.Item
                  {...layout}
                  name="name"
                  label="Name"
                  labelAlign="left"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: 'Please input the name.',
                    },
                  ]}
                >
                  <Input
                    prefix={
                      <UserOutlined size="20" style={{ marginRight: '7px' }} />
                    }
                  />
                </Form.Item>
              )}

              <Form.Item
                {...layout}
                name="phone"
                label="Phone"
                labelAlign="left"
                className={styles.formItem}
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

              <Divider
                style={{ display: siteDisplay }}
                className={styles.divider}
              />
              <Form.Item style={{ display: siteDisplay }}>
                <h2 style={{ marginBottom: '20px', color: '#019638' }}>
                  Site Management
                </h2>
              </Form.Item>
              <Form.Item style={{ display: siteDisplay }} required={true}>
                {sites.length ? (
                  <div>
                    {sites.map((site, index) => (
                      <div key={index} className={styles.siteContainer}>
                        <div>
                          <Form.Item
                            {...layout}
                            label={`Site name${index + 1}`}
                            labelAlign="left"
                            required={true}
                            message="Please input the address."
                          >
                            <Input
                              disabled={site.disabled}
                              value={site.name}
                              style={{ width: '90%', float: 'left' }}
                              onChange={(e) => onChange(index, e)}
                              name="name"
                              prefix={
                                <FaRegBuilding
                                  size="20"
                                  style={{ marginRight: '7px' }}
                                />
                              }
                            />

                            <Tooltip placement="right" title="Update">
                              <Button
                                icon={<FormOutlined />}
                                style={{ border: 'none' }}
                                shape="circle"
                                disabled={occupied}
                                onClick={() => {
                                  if (!occupied) {
                                    setOccupied(true);
                                    ontoggled(index);
                                  }
                                }}
                              />
                            </Tooltip>
                          </Form.Item>
                        </div>
                        <div>
                          <Form.Item
                            {...layout}
                            label={`Address${index + 1}`}
                            labelAlign="left"
                            required={true}
                          >
                            <Input
                              disabled={site.disabled}
                              value={site.location}
                              style={{ width: '90%', float: 'left' }}
                              prefix={
                                <FaRegBuilding
                                  size="20"
                                  style={{ marginRight: '7px' }}
                                />
                              }
                              onChange={(e) => onChange(index, e)}
                              name="location"
                            />
                            {sites.length > 1 ? (
                              <Tooltip placement="right" title="Delete">
                                <Button
                                  icon={<MinusCircleOutlined />}
                                  style={{ border: 'none' }}
                                  shape="circle"
                                  onClick={() => {
                                    ondelete(site.sid);
                                  }}
                                />
                              </Tooltip>
                            ) : null}
                          </Form.Item>
                        </div>
                        {!site.disabled ? (
                          <label
                            style={{ display: warning }}
                            className={styles.labelStyle}
                          >
                            Site name or address cannot be empty
                          </label>
                        ) : null}
                        {!site.disabled ? (
                          <Tooltip placement="right" title="Confirm change">
                            <Button
                              icon={<CheckSquareOutlined />}
                              size="large"
                              style={{ border: 'none', margin: 'auto' }}
                              shape="circle"
                              onClick={() => {
                                if (site.name == '' || site.location == '') {
                                  setWarning('block');
                                } else {
                                  setWarning('none');
                                  ontoggled(index);
                                  onUpdateSite(site);
                                }
                              }}
                            />
                          </Tooltip>
                        ) : null}
                        {index != sites.length - 1 ? (
                          <Divider className={styles.divider} />
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : null}
              </Form.Item>

              <Form.Item
                style={{ display: siteDisplay }}
                wrapperCol="23"
                className={styles.formItem}
              >
                <Button
                  type="dashed"
                  className={styles.btn}
                  size="large"
                  disabled={!siteAbled}
                  onClick={() => setVisible(true)}
                >
                  <PlusOutlined /> Add Site
                </Button>
              </Form.Item>

              <Divider className={styles.divider} />

              <div style={{ display: siteDisplay }}>
                <Form.Item
                  {...layout}
                  name="type"
                  label="Business Type"
                  labelAlign="left"
                  rules={[
                    {
                      required: siteDisplay === 'block' ? true : false,
                      message: "Please select a business type"
                    }
                  ]}
                >
                  <Select >
                    {
                      Array.isArray(type) && 
                      type.map(item =><Option key={item.dataId}>{item.categoryName}</Option>)
                    }
                  </Select>
                </Form.Item>  
              </div>
                        

              <Form.Item wrapperCol="23" className={styles.formItem}>
                <Button type="primary" htmlType="submit" size="large">
                  Modify information
                </Button>
              </Form.Item>
              <SiteModal
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                  setVisible(false);
                }}
              />
            </Form>
          </Card>
        </div>
      </div>
    </Spin>
  );
};
