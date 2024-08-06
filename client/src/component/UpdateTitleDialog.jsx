import React, { useState,useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { updateTitle } from './services'; 

const UpdateTitleDialog = ({ open, onClose, rowId, currentTitle }) => {
  console.log(`rowId,${rowId} currentNew ${currentTitle}`)

  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };
  //לאתחל את החלון הנפתח
  // useEffect(() => {
  //   if (!open) {
  //     setNewTitle(''); // Reset newTitle when dialog is closed
  //   } else {
  //     setNewTitle(currentTitle); // Set newTitle to currentTitle when dialog is opened
  //   }
  // }, [open, currentTitle]);
  const handleSave = async () => {
    try {
      await updateTitle(rowId, newTitle);
      console.log('Title updated successfully');
      onClose();
    } catch (error) {
      console.error('Failed to update the title:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Title</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="New Title"
          type="text"
          fullWidth
          value={newTitle}
          onChange={handleTitleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateTitleDialog;
