import React, { useState } from 'react';
import { Modal, Form, Select, DatePicker, Input } from 'antd';
import PropTypes from 'prop-types';
import { TagErrorPlaceholder } from '@components/placeholders';
import moment from 'moment';
import { FORMAT } from '@constants';
import { TAGS } from '@constants';

/**
 * The booking form, for both new booking and edit booking.
 *
 * @param {object} props - props
 * @return {JSX} - the booking form.
 */
const EditBookingModal = (props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { isNew, onSave, onClose, customerData, bookingData } = props;
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const isCollected = !isNew && bookingData.status.includes(TAGS.COLLECTED);
  const customerMap = {};
  customerData.forEach((item) => {
    customerMap[item.uid] = item;
  });
  const defaultCollectionDate = isNew
    ? moment()
    : moment(bookingData.collectionDate, FORMAT.DATE);
  const defaultBookingDate = isNew
    ? moment()
    : moment(bookingData.bookingDate, FORMAT.DATE);
  const defaultNote =
    isNew || bookingData.note === undefined ? '' : bookingData.note;
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 20 },
  };
  const selectFilterOption = (input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  /**
   * Handles customer selection change.
   *
   * @param {object} customer - customer
   */
  const onCustomerSelectionChange = (customer) => {
    console.log('+++ customer: ', customer);
    setCurrentCustomer(customerMap[customer]);
    form.setFieldsValue({
      siteNew: undefined,
    });
  };

  /**
   * Render the customer selection list items.
   *
   * @return {array} - the customer selection list items
   */
  const RenderCustomerSelectionListItems = () => {
    const items = customerData.map((customer) => {
      return (
        <Option value={customer.uid} key={customer.uid}>
          {customer.name}
        </Option>
      );
    });
    return items;
  };

  /**
   * The customer field.
   *
   * @return {JSX} - the customer field
   */
  const customerField = () => {
    if (isNew || bookingData === undefined) {
      return (
        <Form.Item
          name={'customerNew'}
          label={'Customer'}
          rules={[
            {
              required: true,
              message: 'Please select a customer',
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Select a customer"
            onChange={onCustomerSelectionChange}
            filterOption={selectFilterOption}
          >
            {RenderCustomerSelectionListItems()}
          </Select>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item name={'customerEdit'} label={'Customer'}>
          <Select disabled>
            <Option value={bookingData.customerId} key={bookingData.customerId}>
              {bookingData.customerName}
            </Option>
          </Select>
        </Form.Item>
      );
    }
  };

  /**
   * Render the site selection list items.
   *
   * @return {array} - the site selection list items
   */
  const RenderSiteSelectionListItems = () => {
    if (currentCustomer === null || currentCustomer.sites.length === 0) {
      return [
        <Option value={'error'} key={'error'} disabled>
          <TagErrorPlaceholder msg={'No sites information'} />;
        </Option>,
      ];
    } else {
      const items = currentCustomer.sites.map((site) => {
        return (
          <Option value={site.sid} key={site.sid} title={site.location}>
            {`${site.siteId} - ${site.name}`}
          </Option>
        );
      });
      return items;
    }
  };

  /**
   * The site field.
   *
   * @return {JSX} - the site field.
   */
  const siteField = () => {
    if (isNew || bookingData === undefined) {
      return (
        <Form.Item
          name={'siteNew'}
          label={'Site'}
          rules={[
            {
              required: true,
              message: 'Please select a site',
            },
          ]}
        >
          <Select
            showSearch
            disabled={currentCustomer === null}
            placeholder="Select a site"
            filterOption={selectFilterOption}
          >
            {RenderSiteSelectionListItems()}
          </Select>
        </Form.Item>
      );
    } else {
      return (
        <Form.Item name={'siteEdit'} label={'Site'}>
          <Select disabled>
            <Option value={bookingData.sid} key={bookingData.sid}>
              {`${bookingData.siteId} - ${bookingData.siteName}`}
            </Option>
          </Select>
        </Form.Item>
      );
    }
  };

  return (
    <Modal
      visible={true}
      width={600}
      title={
        isNew ? 'New Booking' : isCollected ? 'Booking Record' : 'Edit Booking'
      }
      okText={isNew ? 'Create' : 'Save'}
      cancelText="Cancel"
      onCancel={onClose}
      okButtonProps={{ disabled: isCollected, hidden: isCollected }}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            if (isNew) {
              onSave(values);
            } else {
              onSave({ ...values, dataId: bookingData.dataId });
            }
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        name={'editBookingForm'}
        {...layout}
        initialValues={{
          collectionDate: defaultCollectionDate,
          bookingDate: defaultBookingDate,
          note: defaultNote,
          siteEdit: isNew ? undefined : bookingData.sid,
          customerEdit: isNew ? undefined : bookingData.customerId,
        }}
      >
        {customerField()}
        {siteField()}
        <Form.Item name={'bookingDate'} label={'Booking Date'}>
          <DatePicker format={FORMAT.DATE} disabled={isCollected} />
        </Form.Item>
        <Form.Item
          name={'collectionDate'}
          label={'Collection Date'}
          rules={[
            {
              required: true,
              message: 'Please select a date',
            },
          ]}
        >
          <DatePicker format={FORMAT.DATE} disabled={isCollected} />
        </Form.Item>
        <Form.Item name={'note'} label={'Note'}>
          <Input.TextArea rows={4} disabled={isCollected} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

EditBookingModal.propTypes = {
  isNew: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  customerData: PropTypes.array.isRequired,
  bookingData: PropTypes.object,
};

export { EditBookingModal };
