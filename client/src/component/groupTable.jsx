import React, { useState } from 'react';
import { useDataContext } from './Contexts/DataContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import './BasicTable.css';
import { addGroup, deleteGroup } from './services';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


const GroupsTable = () => {
  const { groups } = useDataContext();
  const [groupData, setGroupData] = groups;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

const handleDelete = async (groupId) => {
    try {
      await deleteGroup(groupId);
      setGroupData(prev => prev.filter(g => g.id !== groupId));
    } catch (error) {
      console.error('Failed to delete group:', error);
    }
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setNewGroupName('');
  };

  const handleAddGroup = async () => {
    try {
      await addGroup(newGroupName);
      setGroupData((prevGroups) => [...prevGroups, { name: newGroupName }]);
      handleDialogClose();
    } catch (error) {
      console.error('Error adding group:', error);
    }
  };

  return (
    <Card style={{ width: '20%' }}>
      <CardContent>
        <Button variant="contained" color="primary" onClick={handleDialogOpen} style={{ marginBottom: '10px' }}>
        <AddIcon />
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Group Name</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupData.map((g) => (
                <TableRow key={g.id}>
                  <TableCell>{g.name}</TableCell>
                  <TableCell>
                    <DeleteIcon variant="contained" onClick={() => handleDelete(g.id)}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Group</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new group, please enter the group name here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddGroup} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default GroupsTable;
