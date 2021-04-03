import React from 'react';
import { TAGS } from '@constants';
import { Tag } from 'antd';
import {
  CheckCircleOutlined,
  SyncOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import PropTypes from 'prop-types';

const TagRenderer = (props) => {
  const tags = [...props.value];
  // Control how tags are mapped
  const tagMapping = {
    [TAGS.BOOKED]: (
      <Tag
        icon={<ClockCircleOutlined />}
        color={'cyan'}
        title={'Booked but not collected yet'}
      />
    ),
    [TAGS.COLLECTED]: (
      <Tag
        icon={<CheckCircleOutlined />}
        color={'success'}
        title={'Booked and collected'}
      />
    ),
    [TAGS.PROCESSED]: (
      <Tag
        icon={<CheckCircleOutlined />}
        color={'success'}
        title={'Processing is finished'}
      />
    ),
    [TAGS.UNPROCESSED]: (
      <Tag
        icon={<SyncOutlined />}
        color={'processing'}
        title={'Processing is not finished'}
      />
    ),
    [TAGS.PROCESSING]: (
      <Tag
        icon={<SyncOutlined spin />}
        color={'processing'}
        title={'Processing is ongoing'}
      />
    ),
    [TAGS.PENDING]: (
      <Tag
        icon={<SyncOutlined spin />}
        color={'processing'}
        title={'Waiting for confirmation'}
      />
    ),
    [TAGS.ERROR]: (
      <Tag
        icon={<CloseCircleOutlined />}
        color={'error'}
        title={'Errors in data'}
      />
    ),
    [TAGS.ENABLED]: (
      <Tag
        icon={<CheckCircleOutlined />}
        color={'success'}
        title={'Active account'}
      />
    ),
    [TAGS.DISABLED]: (
      <Tag
        icon={<CloseCircleOutlined />}
        color={'error'}
        title={'Suspended account'}
      />
    ),
  };

  return (
    <div
      style={{
        // display: 'flex',
        display: 'inline',
        // alignItems: 'flex-start',
        // flexWrap: 'wrap',
        paddingTop: '3px',
        paddingBottom: '3px',
      }}
    >
      {tags.map((tag) => {
        if (Object.prototype.hasOwnProperty.call(tagMapping, tag)) {
          return <div key={tag}>{tagMapping[tag]}</div>;
        }
      })}
    </div>
  );
};

TagRenderer.propTypes = {
  value: PropTypes.array,
};

export { TagRenderer };
