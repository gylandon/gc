import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { ToastContainer } from '@utils';
import { HeaderLogged } from '@header';
import { Button, Divider, DatePicker, Empty, Card, Table } from 'antd';
import {
  getBusinessReport,
  getBusinessEarliest,
  getBusinessReportFYTD,
} from '@api';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { divider } from './report.less';
import { tokenResponse } from '../../utils/tokenResponse';
import styles from './report.less';

const dateFormat = 'DD/MM/YYYY';
const monthFormat = 'MM/YYYY';

const mapStateToProps = function (state) {
  return {
    name: state.auth[0].data.name,
  };
};

const materialCol = [
  {
    title: 'Material',
    dataIndex: 'material',
    key: 'material',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
];

const customerCol = [
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
];

const businessCol = [
  {
    title: 'Business',
    dataIndex: 'business',
    key: 'business',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
];

const serviceCol = [
  {
    title: 'Service',
    dataIndex: 'service',
    key: 'service',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
    key: 'weight',
  },
];

/*
      eslint-disable
    */
export const BusinessReport = connect(mapStateToProps)((props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [earliestDate, setEarliestDate] = useState(moment('1/1/2020'));

  const [disabled, setDisabled] = useState(false);

  const [report, setReport] = useState({});

  const [showMonth, setShowMonth] = useState(true);

  //  getBusinessReportFYTD

  /**
   * Initialize date
   */

  const now = new Date();
  const curMonth = now.getMonth();
  const curYear = now.getFullYear();

  const [displayFrom, setDisplayFrom] = useState(`${curMonth}/${curYear}`);

  /**
   * Set date
   * @param {Date} value - The selected date.
   * @param {Function} setFrom - setState (from date).
   */
  function onDateChange(value, setFrom) {
    console.log(value);
    if (value) {
      const startDate = value.startOf('day').toDate();
      setFrom(`${startDate.getMonth() + 1}/${startDate.getFullYear()}`);
    }
  }

  useEffect(() => {
    getBusinessEarliest().then(
      (res) => {
        if (res.data.code === 200) {
          setEarliestDate(moment(res.data.data, dateFormat).startOf('day'));
        } else {
          setDisabled(true);
        }
      },
      (err) => {
        if (err.response.status) {
          tokenResponse(err.response.status, dispatch, history);
        }
      }
    );

    return () => {};
  }, []);

  /**
   * Validate date
   * @return { Boolean } - Whether selected date is invalid.
   * @param {Date} currentDate - The selected date.
   */
  function disabledDate(currentDate) {
    return (
      currentDate &&
      (currentDate > moment().startOf('day') || currentDate < earliestDate)
    );
  }

  const [loading, setLoading] = useState(false);

  /**
   * Deal with search
   */
  async function handleSearch(showMonth) {
    try {
      setLoading(true);
      setShowMonth(showMonth);
      const apiFn = showMonth ? getBusinessReport : getBusinessReportFYTD;
      const res = await apiFn({
        displayFrom: `1/${displayFrom}`,
      });
      if (res.data.code === 200) {
        setReport(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.log(err.response);
        switch (err.response.status) {
          case 401:
            history.push('/401');
        }
      }
      setLoading(false);
    }
  }

  const materialData = [];
  const rowMaterialData = report.groupByMaterial || {};
  let idx = 0;
  for (let k in rowMaterialData) {
    if (rowMaterialData.hasOwnProperty(k)) {
      materialData.push({
        key: idx++,
        material: k,
        weight: rowMaterialData[k],
      });
    }
  }

  const customerData = [];
  const rowCustomerData = report.groupByCustomer || {};
  idx = 0;
  for (let k in rowCustomerData) {
    if (rowCustomerData.hasOwnProperty(k)) {
      customerData.push({
        key: idx++,
        customer: k,
        weight: rowCustomerData[k],
      });
    }
  }

  const businessData = [];
  const rowBusinessData = report.groupByBusiness || {};
  idx = 0;
  for (let k in rowBusinessData) {
    if (rowBusinessData.hasOwnProperty(k)) {
      businessData.push({
        key: idx++,
        business: k,
        weight: rowBusinessData[k],
      });
    }
  }

  const serviceData = [];
  const rowServiceData = report.groupByService || {};
  idx = 0;
  for (let k in rowServiceData) {
    if (rowServiceData.hasOwnProperty(k)) {
      serviceData.push({
        key: idx++,
        service: k,
        weight: rowServiceData[k],
      });
    }
  }

  return (
    <div>
      <HeaderLogged name={props.name} />
      <ToastContainer pauseOnHover={false} />
      <section style={{ margin: '10px auto', width: '80%' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div>
            <h1>Business Report</h1>
          </div>
        </header>
        <main style={{ textAlign: 'center' }}>
          <DatePicker
            picker="month"
            disabledDate={disabledDate}
            defaultValue={moment(displayFrom, monthFormat)}
            onChange={(e) => onDateChange(e, setDisplayFrom)}
          />
          <Button
            type="primary"
            style={{ margin: '0 5px' }}
            loading={loading}
            onClick={handleSearch.bind(this, true)}
            disabled={disabled}
          >
            Monthly
          </Button>
          <Button
            type="primary"
            style={{ margin: '0 5px' }}
            loading={loading}
            onClick={handleSearch.bind(this, false)}
            disabled={disabled}
          >
            Yearly
          </Button>
        </main>
        <footer style={{ margin: '10px' }}>
          <div className={styles.total}>
            <Card hoverable={true}>
              <div className={styles.title}>Weight</div>
              <div className={styles.num}>{report.weight || 0}</div>
              {showMonth ? (
                <div className={styles.diff}>
                  <span>{`${Number(
                    (report.weightDifference || 0) * 100
                  ).toFixed(2)}%`}</span>
                  from previous month
                </div>
              ) : (
                ''
              )}
            </Card>
            <Card hoverable={true}>
              <div className={styles.title}>Customer serviced</div>
              <div className={styles.num}>{report.numCustomer || 0}</div>
              {showMonth ? (
                <div className={styles.diff}>
                  <span>{`${Number(
                    (report.customerDifference || 0) * 100
                  ).toFixed(2)}%`}</span>{' '}
                  from previous month
                </div>
              ) : (
                ''
              )}
            </Card>
            <Card hoverable={true}>
              <div className={styles.title}>Sites visited</div>
              <div className={styles.num}>{report.numSiteVisited || 0}</div>
              {showMonth ? (
                <div className={styles.diff}>
                  <span>{`${Number((report.siteDifference || 0) * 100).toFixed(
                    2
                  )}%`}</span>{' '}
                  from previous month
                </div>
              ) : (
                ''
              )}
            </Card>
            <Card hoverable={true}>
              <div className={styles.title}>Trips to site</div>
              <div className={styles.num}>{report.tripsToSites || 0}</div>
              {showMonth ? (
                <div className={styles.diff}>
                  <span>{`${Number((report.tripDifference || 0) * 100).toFixed(
                    2
                  )}%`}</span>{' '}
                  from previous month
                </div>
              ) : (
                ''
              )}{' '}
            </Card>
          </div>
          <div className={styles.analysis}>
            <Card hoverable={true}>
              <div className={styles.table}>
                <Table
                  dataSource={materialData}
                  columns={materialCol}
                  scroll={{ y: '10vw' }}
                />
              </div>
              <div className={styles.pie}>
                <img
                  src={`data:image/png;base64,${report['materialPieChart']}`}
                  alt=""
                ></img>
              </div>
            </Card>
            <Card hoverable={true}>
              <div className={styles.table}>
                <Table
                  dataSource={customerData}
                  columns={customerCol}
                  scroll={{ y: '10vw' }}
                />
              </div>
              <div className={styles.pie}>
                <img
                  src={`data:image/png;base64,${report['customerPieChart']}`}
                  alt=""
                ></img>
              </div>
            </Card>
            <Card hoverable={true}>
              <div className={styles.table}>
                <Table
                  dataSource={businessData}
                  columns={businessCol}
                  scroll={{ y: '10vw' }}
                />
              </div>
              <div className={styles.pie}>
                <img
                  src={`data:image/png;base64,${report['businessPieChart']}`}
                ></img>
              </div>
            </Card>
            <Card hoverable={true}>
              <div className={styles.table}>
                <Table
                  dataSource={serviceData}
                  columns={serviceCol}
                  scroll={{ y: '30vw' }}
                />
              </div>
              <div className={styles.pie}>
                <img
                  src={`data:image/png;base64,${report['servicePieChart']}`}
                ></img>
              </div>
            </Card>
            {!showMonth ? (
              <img
                style={{ width: '80vw' }}
                src={`data:image/png;base64,${report['monthlyBarChart']}`}
              ></img>
            ) : (
              ''
            )}
          </div>
        </footer>
      </section>
    </div>
  );
});
