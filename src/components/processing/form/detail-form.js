import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import style from './index.less';
import { DatePicker } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { useForm } from 'antd/lib/form/util';
import { connect, useSelector } from 'react-redux';

const { TextArea } = Input;

const dateFormat = 'DD/MM/YYYY';

const columnsProps = [
  {
    title: 'Category',
    dataIndex: 'materialCategory',
    width: '30%',
  },
  {
    title: 'Weight',
    dataIndex: 'weight',
  },
  {
    title: 'Comment',
    dataIndex: 'comments',
  },
];

export const DetailFormComponent = (props) => {
  console.log('test', props);
  const collection = useSelector((state) => state.processing.currentCollection);
  let collectionData = {};
  if (collection.data) {
    collectionData = collection.data;
  }
  console.log('test1', collectionData);
  const dataSource = collectionData.items || [];
  const weights = dataSource.reduce((pre, cur) => {
    const curW = Number(cur.weight) ? Number(cur.weight) : 0;
    return pre + curW;
  }, 0);
  return (
    <div id={style['processing-form-wrapper']}>
      <div className={style['processing-form-overview']}>
        <div className={style['processing-form-basic']}>
          <span>
            <div>Service ID</div>
            <Input disabled value={collectionData.dataId || ''}></Input>
          </span>

          <span>
            <div>Collection Date</div>
            <Input disabled value={collectionData.date || ''}></Input>
          </span>

          <span>
            <div>Customer Name</div>
            <Input disabled value={collectionData.customerName || ''}></Input>
          </span>

          <span>
            <div>Customer Site Name</div>
            <Input disabled value={collectionData.siteName || ''}></Input>
          </span>

          <span>
            <div>Driver</div>
            <Input disabled value={collectionData.driverName || ''}></Input>
          </span>
        </div>
        <div className={style['processing-form-note']}>
          <div>Note</div>
          <TextArea disabled value={collectionData.notes || ''}></TextArea>
        </div>
      </div>
      <hr />
      <div>
        <h1 style={{ marginBottom: '3px' }}>Processd Items</h1>
        <div className={style['processing-form-check-header']}>
          <div>
            Processing Date
            <DatePicker
              style={{ marginLeft: '10px' }}
              defaultValue={
                collectionData.processedDate
                  ? moment(collectionData.processedDate, dateFormat)
                  : moment()
              }
              format={dateFormat}
              disabled
            />
          </div>
          <div>
            Processing Staff
            <Input disabled value={collectionData.processorName || ''}></Input>
          </div>
        </div>
        <div className={style['processing-form-check-header']}>
          <div style={{ fontSize: '20px' }}>Total Weights: {weights}</div>
        </div>
        <Table bordered dataSource={dataSource} columns={columnsProps} />
      </div>
    </div>
  );
};
