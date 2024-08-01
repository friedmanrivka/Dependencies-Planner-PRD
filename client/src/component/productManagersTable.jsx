import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import './BasicTable.css';
import { useDataContext } from './Contexts/DataContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { deleteProductManager, updateProductManagerName } from './services'

const API_URL = 'http://localhost:3001/api';

const ProductManagersTable = () => {
  const { productManagers } = useDataContext();
  const [productManagersData, setProductManagersData] = productManagers;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [newName, setNewName] = useState('');

  

  const handleDelete = (email) => {
    deleteProductManager(email);
  };

  const handleUpdateClick = (email) => {
    setCurrentEmail(email);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentEmail('');
    setNewName('');
  };

  const handleUpdate = () => {
    updateProductManagerName(currentEmail, newName);
    handleDialogClose();
  };

  return (
    <Card style={{ width: '60%' }}>
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="highlight-header">Email</TableCell>
                <TableCell className="highlight-header">Name</TableCell>
                <TableCell className="highlight-header">Groups</TableCell>
                <TableCell className="highlight-header">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productManagersData.map((pm) => (
                <TableRow key={pm.email}>
                  <TableCell>{pm.email}</TableCell>
                  <TableCell>{pm.productManagerName}</TableCell>
                  <TableCell>
                    {pm.groupNames.length > 0 ? pm.groupNames.join(', ') : <em>No Groups</em>}
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="contained" 
                      style={{ backgroundColor: '#58D64D' }} 
                      onClick={() => handleDelete(pm.email)}
                    >
                      <DeleteIcon />
                    </Button>
                    <Button 
                      variant="contained" 
                      style={{ backgroundColor: '#FFA500', marginLeft: '10px' }} 
                      onClick={() => handleUpdateClick(pm.email)}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Update Product Manager Name</DialogTitle>
        <DialogContent>
          <TextField 
            autoFocus
            margin="dense"
            label="New Name"
            type="text"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductManagersTable;

