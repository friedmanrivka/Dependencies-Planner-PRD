// 
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { updateDescription } from './services'; 

const UpdateDescriptionDialog = ({ open, onClose, rowId, currentDescription }) => {
    console.log(`rowId, ${rowId} currentDescription ${currentDescription}`);
    const [newDescription, setNewDescription] = useState(currentDescription);

    const handleDescriptionChange = (e) => {
        setNewDescription(e.target.value);
    };

    const handleSave = async () => {
        try {
            await updateDescription(rowId, newDescription);
            console.log('Description updated successfully');
            onClose();
        } catch (error) {
            console.error('Failed to update the description:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Description</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Description"
                    type="text"
                    fullWidth
                    value={newDescription}
                    onChange={handleDescriptionChange}
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

export default UpdateDescriptionDialog;
