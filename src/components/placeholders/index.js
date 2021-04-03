import React from 'react';
import { Tag, Spin, Alert, Row, Col } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

/**
 * A small place holder showing an error tag.
 *
 * @param {object} props - props
 * @return {JSX} - the error tag place holder
 */
const TagErrorPlaceholder = (props) => {
  const msg = props.msg === undefined ? 'Error' : props.msg;
  return (
    <Tag icon={<CloseCircleOutlined />} color="error">
      {msg}
    </Tag>
  );
};

TagErrorPlaceholder.propTypes = {
  msg: PropTypes.string,
};

const LoadingPlaceholder = (props) => {
  const msg = props.msg === undefined ? 'Loading...' : props.msg;
  return (
    <div>
      <Row align={'middle'} justify={'center'}>
        <Col span={6}>
          <Spin size={'large'} tip={msg} />
        </Col>
      </Row>
    </div>
  );
};

LoadingPlaceholder.propTypes = {
  msg: PropTypes.string,
};

const ErrorPlaceholder = (props) => {
  const msg = props.msg === undefined ? 'Loading...' : props.msg;
  return (
    <div>
      <Row align={'middle'} justify={'center'}>
        <Col span={6}>
          <Alert message={'Error'} description={msg} type="error" />
        </Col>
      </Row>
    </div>
  );
};

ErrorPlaceholder.propTypes = {
  msg: PropTypes.string,
};

export { TagErrorPlaceholder, LoadingPlaceholder, ErrorPlaceholder };
