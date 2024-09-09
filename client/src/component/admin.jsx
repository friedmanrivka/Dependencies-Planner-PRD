import './adminDesign.css';
import React, { useState } from 'react';
import ProductManagersTable from './ProductManagersTable';
import GroupTable from './GroupTable';
import { DataProvider } from './Contexts/DataContext';
import Button from '@mui/material/Button';
import AddAdminDialog from './AddAdminDialog';
import SelectQuarterDialog from './SelectQuarterDialog';
import AddPeriodDialog from './AddPeriodDialog';
import { addAdmin, addQ, addRequestPeriod } from './services';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventNoteIcon from '@mui/icons-material/EventNote';

export default function Admin() {
  const [showTable, setShowTable] = useState(false);
  const [showGroupsTable, setShowGroupsTable] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [quarterDialogOpen, setQuarterDialogOpen] = useState(false);
  const [periodDialogOpen, setPeriodDialogOpen] = useState(false);

  const toggleTableVisibility = () => setShowTable((prevShowTable) => !prevShowTable);
  const toggleGroupsTableVisibility = () => setShowGroupsTable((prevShowGroupsTable) => !prevShowGroupsTable);

  const openAdminDialog = () => setAdminDialogOpen(true);
  const closeAdminDialog = () => setAdminDialogOpen(false);

  const handleAddAdmin = async (email, productManagerName) => {
    try {
      await addAdmin(email, productManagerName);
      console.log('Admin added successfully');
    } catch (error) {
      console.error('Error adding admin:', error);
    }
  };

  const openQuarterDialog = () => setQuarterDialogOpen(true);
  const closeQuarterDialog = () => setQuarterDialogOpen(false);

  const handleAddQuarter = async (year, quarter, isCurrent) => {
    try {
      await addQ(year, quarter, isCurrent);
      console.log('Current quarter updated successfully');
    } catch (error) {
      console.error('Error updating current quarter:', error);
    }
  };

  const openPeriodDialog = () => setPeriodDialogOpen(true);

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
      <AppBar position="sticky" style={{ backgroundColor: '#5a00e1' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
            Dependencies Planner PRD
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="admin-page">
        <Box className="button-container">
          <Button
            className="admin-button"
            variant="contained"
            startIcon={<ManageAccountsIcon />}
            onClick={toggleTableVisibility}
          >
            {showTable ? 'Hide Product Managers' : 'Show Product Managers'}
          </Button>
          <Button
            className="admin-button"
            variant="contained"
            startIcon={<GroupIcon />}
            onClick={toggleGroupsTableVisibility}
          >
            {showGroupsTable ? 'Hide Groups' : 'Show Groups'}
          </Button>
          <Button
            className="admin-button"
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={openAdminDialog}
          >
            Add New Admin
          </Button>
          <Button
            className="admin-button"
            variant="contained"
            startIcon={<CalendarTodayIcon />}
            onClick={openQuarterDialog}
          >
            Add Q
          </Button>
          <Button
            className="admin-button"
            variant="contained"
            startIcon={<EventNoteIcon />}
            onClick={openPeriodDialog}
          >
            Add Request Period
          </Button>
        </Box>

        <AddAdminDialog open={adminDialogOpen} onClose={closeAdminDialog} onSubmit={handleAddAdmin} />
        <SelectQuarterDialog open={quarterDialogOpen} onClose={closeQuarterDialog} onSubmit={handleAddQuarter} />
        <AddPeriodDialog open={periodDialogOpen} onClose={() => setPeriodDialogOpen(false)} onSubmit={handleAddPeriod} />

        {showTable && <ProductManagersTable />}
        {showGroupsTable && <GroupTable />}
      </Container>
    </DataProvider>
  );
}
