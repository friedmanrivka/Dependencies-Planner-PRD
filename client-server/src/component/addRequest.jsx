// src/components/MyModal.js
import React from 'react';
import { useGroupContext } from './groupContext';
import { useEffect, useState } from 'react';
import { getFinalDecision, getQuarterDates, getRequestorNames, getPriority, getDescriptions } from './services';
import { Modal, Form, Input, Select } from 'antd';
import QuartersComponent from './qcomponent';

const { Option } = Select;
const MyModal = ({ visible, onClose }) => {

  const { group } = useGroupContext();
  const [finalDecision, setFinalDecision] = useState([]);
  const [quarterDates, setQuarterDates] = useState([]);
  const [requestorNames, setRequestorNames] = useState([]);
  const [priority, setPriority] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const finalDecisionData = await getFinalDecision();
        setFinalDecision(finalDecisionData);

        const quarterDatesData = await getQuarterDates();
        setQuarterDates(quarterDatesData);

        const requestorNamesData = await getRequestorNames();
        setRequestorNames(requestorNamesData);

        const priorityData = await getPriority();
        setPriority(priorityData);

        const descriptionsData = await getDescriptions();
        console.log(descriptionsData)
        setDescriptions(descriptionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [setPriority]);

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
        
        <Form.Item name="RequestorGroup" label="Requestor Group" rules={[{ required: true, message: 'Please choose group' }]}>
          <Select placeholder="Select a group">
            {group.map((item, index) => (
              <Option value="option1" key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="RequstorName" label="Requestor Name" rules={[{ required: true, message: 'Please choose group' }]}>
          <Select placeholder="Select a group">
            {requestorNames.map((item, index) => (
              <Option value="option1" key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="field2" label="Description" rules={[{ required: true, message: 'Please input Description' }]}>
          <Input />
        </Form.Item>

        <Form.Item name="priority" label="priority" rules={[{ required: true, message: 'Please input priority' }]}>
          <Select placeholder="Select an option">
            {priority.map((item, index) => (
              <Option value="option1" key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="Jira" label="Jira link" rules={[{ required: true, message: 'Please input link' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="DependecyGroup" label="Dependecy Group" rules={[{ required: true, message: 'Please choose Groups' }]}>
          <Select mode="multiple" placeholder="Select an option">
            {group.map((item, index) => (
              <Option value="option1" key={index}>{item}</Option>
            ))}
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
