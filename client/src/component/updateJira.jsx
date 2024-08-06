// 
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { updateJira } from './services'; 

const UpdateJira = ({ open, onClose, rowId, currentJira }) => {
    console.log(`rowId, ${rowId} currentJira ${currentJira}`);
    const [newJira, setNewJira] = useState(currentJira);

    const handleJiraChange = (e) => {
        setNewJira(e.target.value);
    };

    const handleSave = async () => {
        try {
            await updateJira(rowId, newJira);
            console.log('Jira updated successfully');
            onClose();
        } catch (error) {
            console.error('Failed to update the Jira:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Jira</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Jira"
                    type="text"
                    fullWidth
                    value={newJira}
                    onChange={handleJiraChange}
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

export default UpdateJira;
