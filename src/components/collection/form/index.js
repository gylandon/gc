import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DatePicker,
  Table,
  Input,
  Button,
  Popconfirm,
  Form,
  Row,
  Col,
  Checkbox,
  Select,
  Space,
  Spin,
} from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import { DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  collection as collectionActions,
  site as siteActions,
  users as userActions,
  booking as bookingActions,
} from '@actions/index';
import { collection as API } from '@api';
import styles from './index.less';

const CONTAINER_TYPES = ['Cage', 'Bag', 'Box'];
const WASTE_TYPES = ['IT & Electrical', 'Miscellaneous'];

const DEFAULT_PAYLOAD = {
  items: [],
};

export const CollectionForm = (props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(DEFAULT_PAYLOAD);
  const [pending, setPending] = useState(false);
  const editMode = props.collectionId;
  const [containerTypes, setContainerTypes] = useState(CONTAINER_TYPES);
  // const [wasteTypes, setWasteType] = useState(WASTE_TYPES);
  // fetch data
  useEffect(() => {
    if (editMode) {
      dispatch(bookingActions.getBookings());
      dispatch(collectionActions.getCollection(props.collectionId));
    } else {
      dispatch(bookingActions.getNotCollectedBookings());
    }

    // API.getCategory().then(res => {
    //   setWasteType(res.data.data.map(o => o.categoryName));
    // });
    API.getContainerTypes().then(res => {
      setContainerTypes(res.data.data.map(o => o.containerType));
    });
  }, [props.collectionId]);

  const bookings = useSelector(
    (state) => state.booking[editMode ? 'bookings' : 'notCollectedBookings']
  );
  const currentCollection = useSelector(
    (state) => state.collection.currentCollection
  );
  const { data = {} } = currentCollection;

  useEffect(() => {
    if (editMode && data) {
      setForm({
        ...data.data,
        booking: data.data.bookingId,
        items: (data.data && data.data.containers) || [],
      });
    }
    return () => dispatch(collectionActions.resetCollection());
  }, [data]);

  const COLUMNS = [
    {
      title: 'ID',
      width: '30px',
      render: (val, record, index) => index + 1,
    },
    {
      title: 'Type',
      dataIndex: 'containerType',
      width: '30%',
      key: 'containerType',
      render: (val, record, index) => (
        <Select
          value={val}
          style={{ display: 'block' }}
          onChange={(value) => {
            if (!editMode) {
              form.items[index].containerType = value;
              setForm({
                ...form,
                items: [...form.items],
              });
            }
          }}
        >
          {containerTypes.map((o) => (
            <Option value={o} key={o}>
              {o}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: 'Content',
      dataIndex: 'content',
      width: '30%',
      key: 'contenet',
      render: (val, record, index) => (
        <Input
          disabled={editMode}
          value={val}
          style={{ display: 'block' }}
          onChange={(e) => {
            if (!editMode) {
              form.items[index].content = e.target.value;
              setForm({
                ...form,
                items: [...form.items],
              });
            }
          }}
        />
      ),
    },
    {
      title: editMode ? 'Quantity' : 'Weight',
      dataIndex: editMode ? 'quantity' : 'weight',
      key: editMode ? 'quantity' : 'weight',
      width: '45px',
      render: (val, record, index) => (
        <Input
          disabled={editMode}
          type="number"
          value={val}
          style={{ display: 'block' }}
          onChange={(e) => {
            if (!editMode) {
              form.items[index][editMode ? 'quantity' : 'weight'] = e.target.value;
              setForm({
                ...form,
                items: [...form.items],
              });
            }
          }}
        />
      ),
    },
    {
      width: '20px',
      render: (text, record, index) => (
        <Button
          disabled={editMode}
          danger
          type="primary"
          onClick={() => deleteItem(index)}
          shape="circle"
          icon={<DeleteOutlined />}
        />
      ),
    },
  ];

  const setField = (name, value) => {
    if (!editMode) {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [
        ...(form.items || []),
        {
          containerID: +form.items.length + 1,
          containerType: '',
          content: '',
          weight: '',
        },
      ],
    });
  };

  const deleteItem = (index) => {
    form.items.splice(index, 1);
    setForm({
      ...form,
      items: [...form.items],
    });
  };

  const handleSubmit = async () => {
    setPending(true);
    try {
      if (!editMode) {
        await API.createCollection(form);
      } else {
        await API.updateCollection(form);
      }
      props.onSubmit(form);
    } catch (err) {
      setPending(false);
    }
  };

  const onBookingSelectionChange = (booking) => {
    if (!editMode) {
      const { customerName, siteName } = bookings.data.find(
        (o) => o.dataId === booking
      );
      setForm({
        ...form,
        booking,
        customerName,
        siteName,
      });
    }
  };

  const formatDate = date => {
    let dateParts = date.split("/");
    return new Date(`${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`)
  }

	const RenderBookingSelectionListItems = () => {
    if (bookings === undefined || bookings.error !== null) {
      return null;
    } else if (bookings.isPending) {
      return (
        <Option>
          <Spin />
        </Option>
      );
    } else {
      bookings.data && bookings.data.sort((a, b) => {
        let dateA = formatDate(a.bookingDate),
          dateB = formatDate(b.bookingDate);
        if (dateA < dateB) return 1;
        if (dateA > dateB) return -1;
        return 0;
      });

      return (bookings.data || []).map((b) => {
        return (
          <Option value={b.dataId} key={b.dataId}>
            {`${b.bookingDate}-${b.customerName}-${b.siteName}`}
          </Option>
        );
      });
    }
  };

  const collection = useSelector((state) => state.collection.currentCollection);

  return (
    <Form disabled={editMode} onSubmit={(e) => e && e.preventDefault()}>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <h2>Containers</h2>
          <Table dataSource={form.items} columns={COLUMNS} pagination={false} />
          <br />
          <Button
            disabled={editMode}
            type="primary"
            block
            onClick={() => addItem()}
          >
            Add Item
          </Button>
        </Col>
        <Col span={8}>
          <div className={styles.collectionField}>
          	<div>Collection Date</div>
          	{editMode ? (
          		<Input
          			value={form.date}
          		/>
          		) : (
          		<DatePicker
			        	// value={moment('29/02/2020')}
			        	onChange={val => setField('date', val.format('DD/MM/YYYY'))}
			          style={{ width: '100%' }}
	            />
	          )}
          </div>
          <div className={styles.collectionField}>
            <div>Booking</div>
            <Select
              block
              placeholder="Select Booking"
              name="booking"
              value={form.booking}
              onChange={onBookingSelectionChange}
              allowClear
              style={{ width: '100%' }}
            >
              {RenderBookingSelectionListItems()}
            </Select>
          </div>
          <div className={styles.collectionField}>
            <div>Customer</div>
            <Input key={form.customerName} value={form.customerName} />
          </div>
          <div className={styles.collectionField}>
            <div>Site</div>
            <Input key={form.siteName} value={form.siteName} />
          </div>
          <div className={styles.collectionField}>
            <Checkbox
              disabled={editMode}
              checked={form.scheduleMatched}
              onChange={() =>
                setField('scheduleMatched', !form.scheduleMatched)
              }
            >
              Match to Schedule
            </Checkbox>
          </div>
          <div className={styles.collectionField}>
            <div>Notes</div>
            <TextArea
              value={form.notes}
              onChange={(e) => setField('notes', e.target.value)}
            />
          </div>
        </Col>
      </Row>
      <Row justify="end">
        <Col>
          <Button onClick={props.onCancel}>Cancel</Button>&nbsp;&nbsp;
          <Button
            disabled={editMode}
            type="primary"
            loading={pending}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
