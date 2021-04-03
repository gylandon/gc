import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PDFObject from 'pdfobject';
import { ToastContainer } from '@utils';
import { HeaderLogged } from '@header';
import { Button, Divider, DatePicker, Empty, Alert } from 'antd';
import { getReport, getEarliest } from '@api';
import { useHistory } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { codeResponse } from '../../utils/codeResponse';
import { divider } from './report.less';
import { tokenResponse } from '../../utils/tokenResponse';

const dateFormat = 'DD/MM/YYYY';

const { RangePicker } = DatePicker;

const mapStateToProps = function (state) {
  return {
    name: state.auth[0].data.name,
  };
};

export const ReportView = connect(mapStateToProps)((props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [earliestDate, setEarliestDate] = useState(moment(0));

  const [disabled, setDisabled] = useState(false);

  /**
   * Set date
   * @param {Date} value - The selected date.
   * @param {Function} setFrom - setState (from date).
   * @param {Function} setTo - setState (to date).
   */
  function onDateChange(value, setFrom, setTo) {
    const [start, end] = value;
    if (start && end) {
      const startDate = start.startOf('day').toDate();
      const endDate = end.endOf('day').toDate();
      setFrom(
        `${startDate.getDate()}/${
          startDate.getMonth() + 1
        }/${startDate.getFullYear()}`
      );
      setTo(
        `${endDate.getDate()}/${
          endDate.getMonth() + 1
        }/${endDate.getFullYear()}`
      );
    }
  }

  useEffect(() => {
    getEarliest().then(
      (res) => {
        if (res.data.code === 200) {
          const e = moment(res.data.data, dateFormat).startOf('day');
          console.log(e);
          console.log(moment(displayFrom, dateFormat));
          console.log(e > moment(displayFrom, dateFormat));
          setEarliestDate(e);
          if (e > moment(displayFrom, dateFormat)) {
            setDisplayFrom(res.data.data);
          }
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
      (currentDate > moment().endOf('day') || currentDate < earliestDate)
    );
  }

  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Initialize date
   */

  const now = new Date();
  const lastMonth = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
  //  const lastYear = new Date(now.getTime() - 365 * 24 * 3600 * 1000);

  const [displayFrom, setDisplayFrom] = useState(
    `${lastMonth.getDate()}/${
      lastMonth.getMonth() + 1
    }/${lastMonth.getFullYear()}`
  );

  // const [comparisonFrom, setComparisonFrom] = useState(
  //   `${lastYear.getFullYear()}-${lastYear.getMonth() + 1}-${lastYear.getDate()}`
  // );

  const [displayTo, setDisplayTo] = useState(
    `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
  );

  /**
   * Deal with search
   */
  async function handleSearch() {
    try {
      setLoading(true);

      // setPdf(report);
      const res = await getReport({
        displayFrom,
        displayTo,
      });
      console.log(res);
      PDFObject.embed(res.data.data, '#pdf-container');
      setUrl(res.data.data);
      setLoading(false);
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

  const description = (
    <span style={{ display: 'block', fontSize: '14px', lineHeight: '22px' }}>
      Please{' '}
      <a href="https://www.greencollect.org/collection-services-2">
        {' '}
        book a collection service
      </a>{' '}
      before seeing the collection report.
    </span>
  );

  return (
    <div>
      <HeaderLogged name={props.name} />
      <ToastContainer pauseOnHover={false} />
      {/* <img
        src="/static/images/service-logo.png"
        style={{
          display: "block",
          height: "200px",
          width: "80%",
          margin: "10px auto",
        }}
      ></img> */}
      <section style={{ margin: '10px auto', width: '80%' }}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div>
            <h1>Collection Report</h1>
          </div>
        </header>
        <main style={{ textAlign: 'center' }}>
          <RangePicker
            disabled={disabled}
            style={{ margin: '0 5px' }}
            disabledDate={disabledDate}
            value={[
              moment(displayFrom, dateFormat),
              moment(displayTo, dateFormat),
            ]}
            onCalendarChange={(e) =>
              onDateChange(e, setDisplayFrom, setDisplayTo)
            }
          />

          <Button
            type="primary"
            style={{ margin: '0 5px' }}
            loading={loading}
            onClick={handleSearch}
            disabled={disabled}
          >
            Generate
          </Button>
          <Button
            type="primary"
            style={{ margin: '0 5px' }}
            disabled={disabled}
          >
            <a href={url} download="report.pdf">
              Download
            </a>
          </Button>
          {disabled ? (
            <Alert
              message="You do not have any collection."
              description={description}
              type="info"
              showIcon
              closable
              style={{
                width: '60%',
                margin: '20px auto',
                backgroundColor: '#e6f7ff',
              }}
            />
          ) : null}
        </main>
        <footer style={{ margin: '10px' }}>
          <div
            id="pdf-container"
            style={{
              width: '100%',
              height: 'calc(100vh - 200px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Empty description={false}></Empty>
          </div>
        </footer>
      </section>
    </div>
  );
});
