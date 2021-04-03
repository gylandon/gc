import React from 'react';
import { Modal, Form, Input } from 'antd';

export const SiteModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Add a new site"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="newName"
          label="Site name"
          rules={[
            {
              required: true,
              message: 'Please input the your new site name here!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="newAddress"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input the your new address here!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
