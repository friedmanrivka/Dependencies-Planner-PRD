// Import necessary libraries and components
import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { saveQuarterSelection } from './services';

const CurrentQuarterSelector = () => {
  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 10]; // For example, you can adjust range as needed
  const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [message, setMessage] = useState('');

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleQuarterChange = (event) => {
    setSelectedQuarter(event.target.value);
  };

  const handleSave = async () => {
    try {
      await saveQuarterSelection(selectedYear, selectedQuarter);
      setMessage(`Successfully set current quarter to ${selectedYear} ${selectedQuarter}`);
    } catch (error) {
      console.error('Error saving quarter selection:', error);
      setMessage('Failed to set current quarter.');
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h6">Set Current Quarter</Typography>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <InputLabel>Year</InputLabel>
        <Select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <InputLabel>Quarter</InputLabel>
        <Select value={selectedQuarter} onChange={handleQuarterChange}>
          {quarters.map((quarter) => (
            <MenuItem key={quarter} value={quarter}>
              {quarter}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
        Save
      </Button>
      {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}
    </Box>
  );
};

export default CurrentQuarterSelector;
