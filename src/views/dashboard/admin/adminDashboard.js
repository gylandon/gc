import { Divider, Button, Card, Layout } from 'antd';
import React, { useState } from 'react';
import { ToastContainer } from '@utils';
import { HeaderLogged } from '@header';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../customer/customerDashboard.less';

// const { Header, Content } = Layout;

const mapStateToProps = function (state) {
  return {
    name: state.auth[0].data.name,
  };
};

export const AdminDashboardView = connect(mapStateToProps)((props) => {
  const history = useHistory();
  const [loadings, setloadings] = useState(false);

  const handleClick = (type) => {
    setloadings(true);
    if (type === 'account') {
      history.push('/admin/account_management');
    } else if (type == 'report') {
      history.push('/admin/report');
    } else {
      history.push('/admin/booking');
    }
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh' }}>
      <HeaderLogged />
      <ToastContainer pauseOnHover={false} />
      <div className={styles.mainBody}>
        <h1>Welcome to Green Collect</h1>
        <div className={styles.cardContainer}>
          <Card className={styles.card} hoverable={true}>
            <img src="/static/images/collection.svg" />
            <Button
              className={styles.btn}
              type="primary"
              loading={loadings}
              onClick={() => handleClick('booking')}
            >
              <label>Client Booking</label>
            </Button>
          </Card>
          <Card className={styles.card} hoverable={true}>
            <img src="/static/images/2.svg" />
            <Button
              className={styles.btn}
              type="primary"
              loading={loadings}
              onClick={() => handleClick('report')}
            >
              <label>Report</label>
            </Button>
          </Card>
          <Card className={styles.card} hoverable={true}>
            <img src="/static/images/invoice.png" />
            <Button
              className={styles.btn}
              type="primary"
              loading={loadings}
              onClick={() => handleClick('account')}
            >
              <label>Account Management</label>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
});
