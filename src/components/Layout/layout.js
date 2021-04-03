import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Button, Card } from 'antd';
import { logoutAction } from '@actions';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import styles from './layout.less';

const { SubMenu } = Menu;
const { Sider } = Layout;

const LayoutComponent = () => {
  const dispatch = useDispatch();
  const [collapsed, setCpllapsed] = useState(false);
  const history = useHistory();

  const toggleCollapsed = () => {
    setCpllapsed(!collapsed);
    console.log(collapsed);
  };

  const handleClick = (item) => {
    const key = item.key;
    if (key === 'Dashboard') {
      history.push('/dashboard');
    } else if (key === 'Database') {
      history.push('/admin/dashboard');
    } else if (key === 'Profile') {
      history.push('/customer/account_profile');
    } else if (key === 'out') {
      logoutAction(dispatch);
      history.push('/');
    } else if (key === 'Booking') {
      history.push('/admin/client_booking');
    }
  };

  const triggerBtn = () => {
    return (
      <div>
        {collapsed ? (
          <Button
            className={styles.triggerBtn}
            style={{ width: '80px' }}
            onClick={toggleCollapsed}
          >
            <RightOutlined style={{ color: '#fff' }} />
          </Button>
        ) : (
          <Button
            className={styles.triggerBtn}
            style={{ width: '200px' }}
            onClick={toggleCollapsed}
          >
            <LeftOutlined style={{ color: '#fff' }} />
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card className={styles.container}>
      <img
        src="/static/images/logo.png"
        alt="logo"
        className={styles.img}
        onClick={() => history.push('/dashboard')}
      />
      <Menu
        theme="light"
        defaultSelectedKeys={['1']}
        mode="inline"
        onClick={handleClick}
        style={{ border: 'none', marginBottom: '20px' }}
      >
        <Menu.Item key="Dashboard" icon={<PieChartOutlined />}>
          Dashboard
        </Menu.Item>
        <Menu.Item key="Database" icon={<DesktopOutlined />}>
          Database
        </Menu.Item>
        <Menu.Item key="Booking" icon={<FileOutlined />}>
          Client Booking
        </Menu.Item>
        <Menu.Item key="Profile" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
        {/* <SubMenu key='role' icon={<TeamOutlined />} title='Role'>
              <Menu.Item key='3'>Tom</Menu.Item>
              <Menu.Item key='4'>Bill</Menu.Item>
              <Menu.Item key='5'>Alex</Menu.Item>
              </SubMenu> */}
        <Menu.Item key="out" icon={<LogoutOutlined />}>
          Log out
        </Menu.Item>
      </Menu>
    </Card>
  );
};

export { LayoutComponent };
