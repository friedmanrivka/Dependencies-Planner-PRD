// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import React, { useState } from 'react';
// import './BasicTable.css';
// import { useDataContext } from './Contexts/DataContext';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
// import { deleteProductManager, updateProductManagerName } from './services'

// const API_URL = 'http://localhost:3001/api';

// const ProductManagersTable = () => {
//   const { productManagers } = useDataContext();
//   const [productManagersData, setProductManagersData] = productManagers;
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [currentEmail, setCurrentEmail] = useState('');
//   const [newName, setNewName] = useState('');

  

//   const handleDelete = (email) => {
//     deleteProductManager(email);
//   };

//   const handleUpdateClick = (email) => {
//     setCurrentEmail(email);
//     setDialogOpen(true);
//   };

//   const handleDialogClose = () => {
//     setDialogOpen(false);
//     setCurrentEmail('');
//     setNewName('');
//   };

//   const handleUpdate = () => {
//     updateProductManagerName(currentEmail, newName);
//     handleDialogClose();
//   };

//   return (
//     <Card style={{ width: '60%' }}>
//       <CardContent>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell className="highlight-header">Email</TableCell>
//                 <TableCell className="highlight-header">Name</TableCell>
//                 <TableCell className="highlight-header">Groups</TableCell>
//                 <TableCell className="highlight-header">Actions</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {productManagersData.map((pm) => (
//                 <TableRow key={pm.email}>
//                   <TableCell>{pm.email}</TableCell>
//                   <TableCell>{pm.productManagerName}</TableCell>
//                   <TableCell>
//                     {pm.groupNames.length > 0 ? pm.groupNames.join(', ') : <em>No Groups</em>}
//                   </TableCell>
//                   <TableCell>
//                     <Button 
//                       variant="contained" 
//                       style={{ backgroundColor: '#58D64D' }} 
//                       onClick={() => handleDelete(pm.email)}
//                     >
//                       <DeleteIcon />
//                     </Button>
//                     <Button 
//                       variant="contained" 
//                       style={{ backgroundColor: '#FFA500', marginLeft: '10px' }} 
//                       onClick={() => handleUpdateClick(pm.email)}
//                     >
//                       <EditIcon />
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </CardContent>
//       <Dialog open={dialogOpen} onClose={handleDialogClose}>
//         <DialogTitle>Update Product Manager Name</DialogTitle>
//         <DialogContent>
//           <TextField 
//             autoFocus
//             margin="dense"
//             label="New Name"
//             type="text"
//             fullWidth
//             value={newName}
//             onChange={(e) => setNewName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleUpdate} color="primary">
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// };

// export default ProductManagersTable;

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import './BasicTable.css';
import { useDataContext } from './Contexts/DataContext';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import AddAdminDialog from './AddAdminDialog'; // Import the AddAdminDialog component
import { deleteProductManager, updateProductManagerName, addProductManager } from './services';

const ProductManagersTable = () => {
  const { productManagers } = useDataContext();
  const [productManagersData, setProductManagersData] = productManagers;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [addAdminDialogOpen, setAddAdminDialogOpen] = useState(false); // State to control AddAdminDialog

  // Function to handle deletion of a product manager
  const handleDelete = async (email) => {
    await deleteProductManager(email);
    // Update the UI by removing the deleted product manager
    setProductManagersData((prevData) => prevData.filter((pm) => pm.email !== email));
  };

  // Function to open the update dialog
  const handleUpdateClick = (email) => {
    setCurrentEmail(email);
    setDialogOpen(true);
  };

  // Function to close the update dialog
  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentEmail('');
    setNewName('');
  };

  // Function to update product manager's name
  const handleUpdate = async () => {
    await updateProductManagerName(currentEmail, newName);
    // Update the UI by changing the product manager's name
    setProductManagersData((prevData) =>
      prevData.map((pm) =>
        pm.email === currentEmail ? { ...pm, productManagerName: newName } : pm
      )
    );
    handleDialogClose();
  };

  // Function to open the AddAdminDialog
  const handleAddAdminClick = () => {
    setAddAdminDialogOpen(true);
  };

  // Function to handle submission from AddAdminDialog
  const handleAddAdminSubmit = async (email, productManagerName) => {
    await addProductManager(email, productManagerName);
    // Update the UI by adding the new product manager
    setProductManagersData((prevData) => [
      ...prevData,
      { email, productManagerName, groupNames: [] }
    ]);
    setAddAdminDialogOpen(false);
  };

  return (
    <Card style={{ width: '60%', margin: 'auto', marginTop: '20px' }}>
      <CardContent>
        <Button
          variant="contained"
          style={{ backgroundColor: '#FFA500', marginBottom: '20px' }}
          onClick={handleAddAdminClick}
        >
          Add Product Manager
        </Button>

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

      {/* Dialog for updating product manager name */}
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

      {/* AddAdminDialog component */}
      <AddAdminDialog
        open={addAdminDialogOpen}
        onClose={() => setAddAdminDialogOpen(false)}
        onSubmit={handleAddAdminSubmit}
      />
    </Card>
  );
};

export default ProductManagersTable;
