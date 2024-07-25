import React from 'react';
import { useDataContext } from './Contexts/DataContext';
import { useEffect, useState } from 'react';
import { getFinalDecision, getQuarterDates, getRequestorNames, getPriority, getDescriptions, addNewRequest } from './services';
import { Modal, Form, Input, Select } from 'antd';

const { Option } = Select;


const MyModal = ({ visible, onClose }) => {
  const {
    group: [group, setGroup],
    productManager: [productManager, setProductManager],
    finalDecision: [finalDecision, setFinalDecision],
    quarterDates: [quarterDates, setQuarterDates],
    requestorNames: [requestorNames, setRequestorNames],
    priorityOptions: [priorityOptions, setPriorityOptions],
    descriptions: [descriptions, setDescriptions],
    status: [status, setStatus]
  } = useDataContext();

  const [form] = Form.useForm();
  const [request, setRequest] = useState({
    title: '',
    requestorGroup: '',
    description: '',
    JiraLink: '',
    priority: '',
    affectedGroupList: []
  });

  useEffect(() => {
  }, [group,
    finalDecision,
    quarterDates,
    requestorNames,
    priorityOptions,
    descriptions,
    status]);

  const handleChange = (key, value) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      [key]: value,
    }));
  };

  const handleAddRequest = async () => {
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        console.error('User email not found in localStorage');
        return;
      }
      
      const newRequest = { ...request, productmanageremail: email }; // Add email to request
      console.log("Submitting request:", newRequest);
      await addNewRequest(newRequest);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding request:', error);
    }
  };

  return (
    <Modal title="New Request" visible={visible} onCancel={onClose} onOk={handleAddRequest}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input Title' }]}
        >
          <Input onChange={(e) => handleChange('title', e.target.value)} />
        </Form.Item>
        <Form.Item
          name="requestorGroup"
          label="Requestor Group"
          rules={[{ required: true, message: 'Please choose group' }]}
        >
          <Select
            placeholder="Select a group"
            onChange={(value) => handleChange('requestorGroup', value)}
          >
            {group.map((item, index) => (
              <Option value={item} key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input Description' }]}
        >
          <Input onChange={(e) => handleChange('description', e.target.value)} />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: 'Please input priority' }]}
        >
          <Select
            placeholder="Select a priority"
            onChange={(value) => handleChange('priority', value)}
          >
            {priorityOptions.map((item, index) => (
              <Option value={item} key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="JiraLink"
          label="Jira Link"
          rules={[{ required: true, message: 'Please input link' }]}
        >
          <Input onChange={(e) => handleChange('JiraLink', e.target.value)} />
        </Form.Item>
        <Form.Item
          name="affectedGroupList"
          label="Dependency Group"
          rules={[{ required: true, message: 'Please choose Groups' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select groups"
            onChange={(value) => handleChange('affectedGroupList', value)}
          >
            {group.map((item, index) => (
              <Option value={item} key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MyModal;
