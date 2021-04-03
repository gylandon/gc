import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { ToastContainer } from '@utils';
import { HeaderLogged } from '@header';
import { CollectionTableComponent } from '@components/collection';
import { collection as collectionActions } from '@actions/index';
import { TAGS } from '@constants';
import { collection as API } from '@api';
import styles from './index.less';

const CollectionView = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth);
  useEffect(() => {
    dispatch(collectionActions.getCollections(userInfo[0].data.role[0].roleName == 'ROLE_customer'));
  }, []);
  const collections = useSelector((state) => state.collection.collections);

  const renderHeader = () => {
    return <HeaderLogged />;
  };

  // if (loading !== collections.isPending) {
  //   setLoading(collections.isPending);
  // }

  const handleSubmit = () => dispatch(collectionActions.getCollections());

  const handleDeleteCollections = async (ids) => {
    try {
      await API.deleteCollections(ids);
      dispatch(collectionActions.getCollections());
    } catch (err) {}
  };

  const renderBody = () => {
    return (
      <Spin size={'large'} spinning={loading}>
        <div id={styles['booking-grid-wrapper']}>
          <CollectionTableComponent
            collectionData={collections.data || []}
            onSubmit={handleSubmit}
            onDeleteCollections={handleDeleteCollections}
          />
        </div>
      </Spin>
    );
  };

  return (
    <div>
      {renderHeader()}
      {renderBody()}
      <ToastContainer />
    </div>
  );
};

export { CollectionView };
