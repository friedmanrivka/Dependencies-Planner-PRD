import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { updateComment } from './services'; 

const UpdateComment = ({ open, onClose, rowId, currentComment }) => {
    console.log(`rowId, ${rowId} currentComment ${currentComment}`);
    const [newComment, setNewComment] = useState(currentComment);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSave = async () => {
        try {
            await updateComment(rowId, newComment);
            console.log('Comment updated successfully');
            onClose();
        } catch (error) {
            console.error('Failed to update the Comment:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Update Comment</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="New Comment"
                    type="text"
                    fullWidth
                    value={newComment}
                    onChange={handleCommentChange}
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

export default UpdateComment;
