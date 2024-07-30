

import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { getAllStatus } from './services';

const ManageRequestButton = () => {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState('');
  const [buttonText, setButtonText] = useState('Manage');
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    if (open) {
      fetchStatusOptions();
    }
  }, [open]);

  const fetchStatusOptions = async () => {
    try {
      const data = await getAllStatus();
      console.log(data); 
      const transformedData = data.map((status, index) => ({
        id: index,
        value: status,
        label: status,
      }));
      setStatusOptions(transformedData);
    } catch (error) {
      console.error('Error fetching status options:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setResponse('');
  };

  const handleSubmit = () => {
    setButtonText(`${response}`);
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog id="dialog" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Approve Request</DialogTitle>
        <DialogContent>
      
          <FormControl fullWidth margin="normal">
            <InputLabel id="response-label">status</InputLabel>
            <Select
              labelId="response-label"
              id="response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            >
              {statusOptions.map((status) => (
                <MenuItem key={status.id} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageRequestButton;
