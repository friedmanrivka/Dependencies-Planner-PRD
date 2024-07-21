import React from 'react';
import { useGroupContext } from './groupContext';
import { useEffect, useState } from 'react';
import { getFinalDecision, getQuarterDates, getRequestorNames, getPriority, getDescriptions, addNewRequest } from './services';
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
        setDescriptions(descriptionsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const [form] = Form.useForm();
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log('Form Values:', values);
        try {
          await addNewRequest(values); // Call the server function here
          onClose(); // Close the modal after successful submission
        } catch (error) {
          console.error('Error adding new request:', error);
        }
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal title="New Request" visible={visible} onCancel={onClose} onOk={handleOk}>
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input Title' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="requestorGroup" label="Requestor Group" rules={[{ required: true, message: 'Please choose group' }]}>
          <Select placeholder="Select a group">
            {group.map((item, index) => (
              <Option value={item} key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="requestorName" label="Requestor Name" rules={[{ required: true, message: 'Please choose name' }]}>
          <Select placeholder="Select a name">
            {requestorNames.map((item, index) => (
              <Option value={item} key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input Description' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Please input priority' }]}>
          <Select placeholder="Select a priority">
            {priority.map((item, index) => (
              <Option value={item} key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="jiraLink" label="Jira Link" rules={[{ required: true, message: 'Please input link' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="dependencyGroup" label="Dependency Group" rules={[{ required: true, message: 'Please choose Groups' }]}>
          <Select mode="multiple" placeholder="Select groups">
            {group.map((item, index) => (
              <Option value={item} key={index}>{item}</Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item name="selectField" label="Select Field" rules={[{ required: true, message: 'Please select an option!' }]}>
          <QuartersComponent />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default MyModal;
