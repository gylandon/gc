import React, { useState } from 'react';
import { ToastContainer } from '@utils';
import { HeaderLogged } from '@header';
import { ProcessingTableComponent } from '@components/processing';
import { TagErrorPlaceholder } from '@components/placeholders';
import styles from './index.less';
import { TAGS } from '@constants';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';

const mockData = [
  {
    dataId: 201,
    customerId: 725,
    customerName: 'Blue Collect',
    siteId: 'B071',
    siteName: '127 Blue Street',
    bookingDate: '01/06/2020',
    collectionDate: '03/06/2020',
    status: [TAGS.ERROR],
  },
  {
    dataId: 202,
    customerId: 725,
    customerName: 'Blue Collect',
    siteId: 'B072',
    siteName: '129 Blue Street',
    bookingDate: '01/06/2020',
    collectionDate: '01/01/2021',
    status: [TAGS.BOOKED],
  },
  {
    dataId: 195,
    customerId: 334,
    customerName: 'Red Collect',
    siteId: 'C025',
    siteName: '33 Red Street',
    bookingDate: '28/05/2020',
    collectionDate: '12/08/2020',
    status: [TAGS.COLLECTED],
  },
  {
    dataId: 235,
    customerId: 311,
    customerName: 'Orange Collect',
    siteId: 'C103',
    siteName: '94 Orange Street',
    bookingDate: '15/08/2020',
    collectionDate: '26/09/2020',
    status: [TAGS.BOOKED],
  },
  {
    dataId: 238,
    customerId: 311,
    customerName: 'Orange Collect',
    siteId: 'C104',
    siteName: '97 Orange Street',
    bookingDate: '17/08/2020',
    collectionDate: '26/09/2020',
    status: [TAGS.PENDING],
  },
  {
    dataId: 242,
    customerId: 311,
    customerName: 'Orange Collect',
    siteId: 'C105',
    siteName: '99 Orange Street',
    bookingDate: '19/08/2020',
    collectionDate: '26/09/2020',
    status: [TAGS.PENDING],
  },
];

const renderHeader = () => {
  return <HeaderLogged />;
};

const renderBody = (props) => {
  const [loading, setLoading] = useState(false);
  const { collections } = useSelector((data) => data.processing);
  if (collections.error !== null) {
    return <TagErrorPlaceholder />;
  }
  if (loading !== collections.isPending) {
    setLoading(collections.isPending);
  }
  return (
    <Spin size={'large'} spinning={loading}>
      <div id={styles['processing-grid-wrapper']}>
        <ProcessingTableComponent {...props} />
        <ToastContainer />
      </div>
    </Spin>
  );
};

export const ProcessingView = (props) => {
  return (
    <div>
      {renderHeader()}
      {renderBody(props)}
    </div>
  );
};
