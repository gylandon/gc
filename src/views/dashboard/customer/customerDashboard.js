import { Divider, Button, Card } from 'antd';
import React, { useState } from 'react';
import { ToastContainer } from '@utils';
import { HeaderLogged } from '@header';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './customerDashboard.less';

const mapStateToProps = function (state) {
  return {
    name: state.auth[0].data.name,
  };
};

export const CustomerDashboardView = connect(mapStateToProps)((props) => {
  const history = useHistory();
  const [loadings, setloadings] = useState(false);

  const handleClick = (type) => {
    // setloadings(true);
    if (type === 'collection') {
      history.push('/customer/collection');
    } else if (type === 'report') {
      history.push('/customer/report');
    } else {
    }
  };

  return (
    <div style={{ width: '100vw', textAlign: 'center' }}>
      <HeaderLogged name={props.name} />
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
              onClick={() => handleClick('collection')}
            >
              <label>My Collection</label>
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
              <label>Personal Report</label>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
});
