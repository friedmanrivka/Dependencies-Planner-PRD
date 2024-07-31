import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import './BasicTable.css';
import { useDataContext } from './Contexts/DataContext';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api'; // Replace with your actual API URL

const ProductManagersTable = () => {
  const { productManagers } = useDataContext();
  const [productManagersData, setProductManagersData] = productManagers;

  const deleteProductManager = async (email) => {
    try {
      const response = await axios.delete(`${API_URL}/delete-product-manager/${email}`);
      setProductManagersData(prevData => prevData.filter(pm => pm.email !== email));
      return response.data;
    } catch (error) {
      console.error('Error deleting Product Manager:', error);
      throw error;
    }
  };

  const handleDelete = (email) => {
   
      deleteProductManager(email);
    
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
                    ><DeleteIcon></DeleteIcon>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ProductManagersTable;
