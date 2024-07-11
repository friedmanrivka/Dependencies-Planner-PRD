// src/components/MyModal.js
import React from 'react';
import { Modal, Form, Input, Select } from 'antd';
import QuartersComponent from './qcomponent';
const { Option } = Select;
// import {Table} from './table'
const MyModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        console.log('Form Values:', values);
        onClose();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
      
  };

  return (
    <Modal title="New Request" visible={visible} onCancel={onClose} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item name="" label="Title" rules={[{ required: true, message: 'Please input Title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="RequestorGroup" label="Requestor Group" rules={[{required: true, message:'Please choose group'}]}>
        <Select placeholder="Select a group">
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </Select>
        </Form.Item>
        <Form.Item name="RequstorName" label="Requestor Name" rules={[{ required: true, message: 'Please input Name' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="field2" label="Description" rules={[{ required: true, message: 'Please input Description' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="priority" label="priority" rules={[{required: true, message:'Please input priority'}]}>
        <Select placeholder="Select an option">
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
            <Option value="option4">Option 4</Option>
          </Select>
        </Form.Item>
        <Form.Item name="Jira" label="Jira link" rules={[{ required: true, message: 'Please input link' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="DependecyGroup" label="Dependecy Group" rules={[{required: true, message:'Please choose Groups'}]}>
        <Select mode="multiple" placeholder="Select an option">
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            <Option value="option3">Option 3</Option>
          </Select>
        </Form.Item>
        <Form.Item name="selectField" label="Select Field" rules={[{ required: true, message: 'Please select an option!' }]}>
          <QuartersComponent />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MyModal;
