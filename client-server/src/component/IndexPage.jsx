// src/pages/index.js
import React, { useState } from 'react';
import { Button } from 'antd';
import MyModal from './addRequest';

const IndexPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        New Request
      </Button>
      <MyModal visible={isModalVisible} onClose={handleClose} />
    </div>
  );
};

export default IndexPage;
