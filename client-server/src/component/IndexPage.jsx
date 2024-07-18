// src/pages/index.js
import React, { useState } from 'react';
import { Button } from 'antd';
import MyModal from './addRequest';
import BasicTable from './table';

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
      {/* <BasicTable /> */}
    </div>
  );
};

export default IndexPage;
