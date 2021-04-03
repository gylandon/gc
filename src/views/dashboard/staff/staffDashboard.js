import { Divider, Button, Card } from 'antd';
import React, { useState } from 'react';
import { ToastContainer } from '@utils';
import { HeaderLogged } from '@header';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../customer/customerDashboard.less';

const mapStateToProps = function (state) {
  return {
    name: state.auth[0].data.name,
    role: state.auth[0].data.role[0].rid
  };
};

export const StaffDashboardView = connect(mapStateToProps)((props) => {
  const history = useHistory();
  const [loadings, setloadings] = useState(false);

  const handleClick = () => {
    setloadings(true);
    history.push('/processor/processing');
  };

  return (
    <div style={{ width: '100vw', textAlign: 'center' }}>
      <HeaderLogged name={props.name} />
      <ToastContainer pauseOnHover={false} />
      {
        props.role === 4?
        <Button type='primary' style={{float:'left'}}
          onClick={()=>history.goBack()}
        >
          Back
        </Button>
        : null
      }
      <div className={styles.mainBody}>
        <h1>Welcome to Green Collect</h1>
        <div className={styles.cardContainer}>
          <Card className={styles.card} hoverable={true}>
            <img src="/static/images/invoice.png" />
            <Button
              className={styles.btn}
              type="primary"
              loading={loadings}
              onClick={() => handleClick()}
            >
              <label>Collections</label>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
});
