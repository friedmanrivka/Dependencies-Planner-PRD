// src/components/QuartersComponent.js
import React, { useState } from 'react';
import { Select } from 'antd';

const { Option } = Select;

const QuartersComponent = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('');

  // Function to get the current quarter
  const getCurrentQuarter = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 1 && month <= 3) {
      return 'Q1';
    } else if (month >= 4 && month <= 6) {
      return 'Q2';
    } else if (month >= 7 && month <= 9) {
      return 'Q3';
    } else {
      return 'Q4';
    }
  };

  // Function to handle quarter selection change
  const handleQuarterChange = value => {
    setSelectedQuarter(value);
  };

  // Current year
  const currentYear = new Date().getFullYear();

  // Calculate the current and next quarters
  const currentQuarter = getCurrentQuarter();
  const nextQuarter = currentQuarter === 'Q4' ? 'Q1' : `Q${parseInt(currentQuarter.substring(1)) + 1}`;
  const nextQuarterYear = nextQuarter === 'Q1' ? currentYear + 1 : currentYear;

  return (
    <Select value={selectedQuarter} style={{ width: 200 }} onChange={handleQuarterChange}>
      <Option value={currentQuarter}>{`${currentQuarter} ${currentYear}`}</Option>
      <Option value={nextQuarter}>{`${nextQuarter} ${nextQuarterYear}`}</Option>
    </Select>
  );
};

export default QuartersComponent;
