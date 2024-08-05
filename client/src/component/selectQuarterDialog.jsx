import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const SelectQuarterDialog = ({ open, onClose, onSubmit }) => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear);
  const [quarter, setQuarter] = useState('Q1');

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleQuarterChange = (event) => {
    setQuarter(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(year, quarter);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Current Quarter</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            value={year}
            onChange={handleYearChange}
          >
            {[currentYear, currentYear + 1, currentYear +9].map((yr) => (
              <MenuItem key={yr} value={yr}>
                {yr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="quarter-select-label">Quarter</InputLabel>
          <Select
            labelId="quarter-select-label"
            value={quarter}
            onChange={handleQuarterChange}
          >
            {['Q1', 'Q2', 'Q3', 'Q4'].map((qtr) => (
              <MenuItem key={qtr} value={qtr}>
                {qtr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectQuarterDialog;
