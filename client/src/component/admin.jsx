import './adminDesign.css';
import React, { useState } from 'react';
import ProductManagersTable from './productManagersTable';
import GroupTable from './groupTable';
import { DataProvider } from './Contexts/DataContext';
import Button from '@mui/material/Button';
import AddAdminDialog from './AddAdminDialog';
import SelectQuarterDialog from './selectQuarterDialog';
import AddPeriodDialog from './AddPeriodDialog'; // Import the new dialog component
import { addAdmin, addQ, addRequestPeriod } from './services'; // Import the service functions
import {
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';

// Admin Component
export default function Admin() {
  // State variables for showing tables and dialogs
  const [showTable, setShowTable] = useState(false);
  const [showGroupsTable, setShowGroupsTable] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [quarterDialogOpen, setQuarterDialogOpen] = useState(false);
  const [periodDialogOpen, setPeriodDialogOpen] = useState(false); // State for AddPeriodDialog

  // Toggle function to show/hide Product Managers Table
  const toggleTableVisibility = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  // Toggle function to show/hide Groups Table
  const toggleGroupsTableVisibility = () => {
    setShowGroupsTable((prevShowGroupsTable) => !prevShowGroupsTable);
  };

  // Function to open the AddAdminDialog
  const openAdminDialog = () => {
    setAdminDialogOpen(true);
  };

  // Function to close the AddAdminDialog
  const closeAdminDialog = () => {
    setAdminDialogOpen(false);
  };

  // Function to handle the addition of a new admin
  const handleAddAdmin = async (email, productManagerName) => {
    try {
      await addAdmin(email, productManagerName);
      console.log('Admin added successfully');
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  // Function to open the SelectQuarterDialog
  const openQuarterDialog = () => {
    setQuarterDialogOpen(true);
  };

  // Function to close the SelectQuarterDialog
  const closeQuarterDialog = () => {
    setQuarterDialogOpen(false);
  };

  // Function to handle the submission of the selected quarter
  const handleAddQuarter = async (year, quarter, isCurrent) => {
    try {
      await addQ(year, quarter, isCurrent);
      console.log('Current quarter updated successfully');
    } catch (error) {
      console.error('Error updating current quarter:', error);
    }
  };

  // Function to open the AddPeriodDialog
  const openPeriodDialog = () => {
    setPeriodDialogOpen(true);
  };

  // Function to handle submission from AddPeriodDialog
  const handleAddPeriod = async (start, end) => {
    try {
      await addRequestPeriod(start, end);
      console.log('Request period added successfully');
    } catch (error) {
      console.error('Error adding request period:', error);
    }
  };

  return (
    <DataProvider>
      <AppBar position="sticky" style={{ backgroundColor: '#00C2FF' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dependencies Planner PRD
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="admin-page" style={{ padding: '20px' }}>
        <div className="button-container">
          {/* Button to toggle Product Managers Table visibility */}
          <Button
            className="admin-button"
            variant="contained"
            onClick={toggleTableVisibility}
          >
            {showTable ? 'Hide Product Managers' : 'Show Product Managers'}
          </Button>

          {/* Button to toggle Groups Table visibility */}
          <Button
            className="admin-button"
            variant="contained"
            onClick={toggleGroupsTableVisibility}
          >
            {showGroupsTable ? 'Hide Groups' : 'Show Groups'}
          </Button>

          {/* Button to open AddAdminDialog */}
          <Button
            className="admin-button"
            variant="contained"
            onClick={openAdminDialog}
          >
            Add New Admin
          </Button>

          {/* Button to open SelectQuarterDialog */}
          <Button
            className="admin-button"
            variant="contained"
            onClick={openQuarterDialog}
          >
            Add Q
          </Button>

          {/* New button to open AddPeriodDialog */}
          <Button
            className="admin-button"
            variant="contained"
            onClick={openPeriodDialog}
          >
            Add Request Period
          </Button>
        </div>

      
        <AddAdminDialog open={adminDialogOpen} onClose={closeAdminDialog} onSubmit={handleAddAdmin} />

        <SelectQuarterDialog open={quarterDialogOpen} onClose={closeQuarterDialog} onSubmit={handleAddQuarter} />

        {/* AddPeriodDialog component */}
        <AddPeriodDialog open={periodDialogOpen} onClose={() => setPeriodDialogOpen(false)} onSubmit={handleAddPeriod} />

        {/* Render Product Managers Table if showTable is true */}
        {showTable && <ProductManagersTable />}

    
        {showGroupsTable && <GroupTable />}
      </div>

      {/* Background square under buttons */}
      <div className="background-square"></div>
    </DataProvider>
  );
}
