import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd'; // Using message for notifications
import { useDataContext } from './Contexts/DataContext';
import { addNewRequest, currentQ } from './services'; // Import services

const { Option } = Select;

const MyModal = ({ visible, onClose, onAddRequest }) => {
  const {
    group: [group],
    quarterDates: [planned],
    priorityOptions: [priorityOptions],
    refreshRows,
  } = useDataContext();

  const [form] = Form.useForm();
  const [currentqValue, setCurrentq] = useState('');

  const [request, setRequest] = useState({
    title: '',
    requestorGroup: '',
    description: '',
    JiraLink: '',
    priority: '',
    affectedGroupList: [],
    planned: '',
  });

  // Fetch the current quarter value when the component mounts
  const fetchCurrentQuarter = async () => {
    try {
      const data = await currentQ();
      console.log("Current quarter fetched:", data); // Debugging line
      setCurrentq(data);
    } catch (error) {
      console.error('Failed to get current quarter:', error);
    }
  };

  useEffect(() => {
    fetchCurrentQuarter();
  }, []);

  // Reset the form fields and set default values whenever the modal becomes visible
  useEffect(() => {
    if (visible) {
      form.resetFields();
      setRequest((prevRequest) => ({
        ...prevRequest,
        planned: currentqValue,
      }));
    }
  }, [visible, currentqValue, form]);

  const fetchData = async () => {
    refreshRows();
  };

  const handleChange = (key, value) => {
    setRequest((prevRequest) => ({
      ...prevRequest,
      [key]: value,
    }));
  };

  const handleAddRequest = async () => {
    try {
      const titleRegex = /[a-zA-Z]/;
      const descriptionRegex = /[a-zA-Z]/;

      if (!titleRegex.test(request.title)) {
        form.setFields([
          {
            name: 'title',
            errors: ['Title must contain characters and not just numbers'],
          },
        ]);
        return;
      }
      if (!descriptionRegex.test(request.description)) {
        form.setFields([
          {
            name: 'description',
            errors: ['Description must contain characters and not just numbers'],
          },
        ]);
        return;
      }

      const email = localStorage.getItem('userEmail');
      if (!email) {
        console.error('User email not found in localStorage');
        message.error('User email not found, please log in again.');
        return;
      }

       const newRequest = { ...request, productmanageremail: email }; // Add email to request
      console.log("Submitting request:", newRequest);
      const response =await addNewRequest(newRequest);
      fetchData();
      form.resetFields(); // Reset the form fields
      onAddRequest(response);
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error adding request:', error);
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log('Form Values:', values);
        handleAddRequest();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal title="New Request" visible={visible} onCancel={onClose} onOk={handleOk}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          planned: currentqValue,
        }}
      >
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
          rules={[{ required: true, message: 'Please input Requestor Group' }]}
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
          rules={[{ required: false }]}
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
        <Form.Item
          name="planned"
          label="Planned"
          rules={[{ required: true, message: 'Please select a planned quarter!' }]}
          initialValue={currentqValue}
        >
          <Select
            defaultValue={currentqValue} // Ensure default value is set
            placeholder="Select a planned quarter"
            onChange={(value) => handleChange('planned', value)}
          >
            {planned.map((item, index) => (
              <Option value={item} key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default MyModal;

