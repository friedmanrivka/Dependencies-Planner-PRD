
// import React, { useState } from 'react';
// import ProductManagersTable from './productManagersTable';
// import GroupTable from './groupTable';
// import { DataProvider } from './Contexts/DataContext';
// import Button from '@mui/material/Button';
// import AddAdminDialog from './AddAdminDialog'; // Import the AddAdminDialog component
// import { addAdmin,addQ } from './services'; // Import the addAdmin function
// import SelectQuarterDialog from './selectQuarterDialog '

// // Admin Component
// export default function Admin() {
//   // State variables for showing tables and dialog
//   const [showTable, setShowTable] = useState(false);
//   const [showGroupsTable, setShowGroupsTable] = useState(false);
//   const [dialogOpen, setDialogOpen] = useState(false); // State for controlling dialog visibility
//   const [quarterDialogOpen, setQuarterDialogOpen] = useState(false);

//   // Toggle function to show/hide Product Managers Table
//   const toggleTableVisibility = () => {
//     setShowTable((prevShowTable) => !prevShowTable);
//   };

//   // Toggle function to show/hide Groups Table
//   const toggleGroupsTableVisibility = () => {
//     setShowGroupsTable((prevShowTable) => !prevShowTable);
//   };

//   // Function to open the AddAdminDialog
//   const openDialog = () => {
//     setDialogOpen(true);
//   };

//   // Function to close the AddAdminDialog
//   const closeDialog = () => {
//     setDialogOpen(false);
//   };

//   // Function to handle the addition of a new admin
//   const handleAddAdmin = async (email, productManagerName) => {
//     try {
//       // Call the addAdmin service function to add the admin
//       await addAdmin(email, productManagerName);
//       console.log('Admin added successfully');
//       // Here, you can add logic to refresh data or update the UI
//     } catch (error) {
//       console.error('Error adding admin:', error);
//       // Optionally, display an error message to the user
//     }
//   };

//   return (
//     <DataProvider>
//       <div className="admin-page" style={{ padding: '20px' }}>
//         {/* Button to toggle Product Managers Table visibility */}
//         <Button
//           variant="contained"
//           style={{ backgroundColor: '#58D64D', width: '350px', height: '60px', marginBottom: '20px' }}
//           onClick={toggleTableVisibility}
//         >
//           {showTable ? 'Hide Product Managers Table' : 'Show Product Managers Table'}
//         </Button>
        
//         {/* Render Product Managers Table if showTable is true */}
//         {showTable && <ProductManagersTable />}
        
//         {/* Button to toggle Groups Table visibility */}
//         <Button
//           variant="contained"
//           style={{ backgroundColor: '#58D64D', width: '350px', height: '60px', marginBottom: '20px', marginLeft: '10%' }}
//           onClick={toggleGroupsTableVisibility}
//         >
//           {showGroupsTable ? 'Hide Groups Table' : 'Show Groups Table'}
//         </Button>
        
//         {/* Render Groups Table if showGroupsTable is true */}
//         {showGroupsTable && <GroupTable />}

//         {/* Button to open AddAdminDialog */}
//         <Button
//           variant="contained"
//           style={{ backgroundColor: '#FFA500', width: '350px', height: '60px', marginTop: '20px' }}
//           onClick={openDialog}
//         >
//           Add New Admin
//         </Button>

//         {/* AddAdminDialog component */}
//         <AddAdminDialog open={dialogOpen} onClose={closeDialog} onSubmit={handleAddAdmin} />
//       </div>
//     </DataProvider>
//   );
// }


import React, { useState } from 'react';
import ProductManagersTable from './productManagersTable';
import GroupTable from './groupTable';
import { DataProvider } from './Contexts/DataContext';
import Button from '@mui/material/Button';
import AddAdminDialog from './AddAdminDialog'; // Import the AddAdminDialog component
import SelectQuarterDialog from './selectQuarterDialog'; // Import the SelectQuarterDialog component
import { addAdmin, addQ } from './services'; // Import the addAdmin and addQ functions

// Admin Component
export default function Admin() {
  // State variables for showing tables and dialogs
  const [showTable, setShowTable] = useState(false);
  const [showGroupsTable, setShowGroupsTable] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false); // State for AddAdminDialog
  const [quarterDialogOpen, setQuarterDialogOpen] = useState(false); // State for SelectQuarterDialog

  // Toggle function to show/hide Product Managers Table
  const toggleTableVisibility = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  // Toggle function to show/hide Groups Table
  const toggleGroupsTableVisibility = () => {
    setShowGroupsTable((prevShowTable) => !prevShowTable);
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
      // Call the addAdmin service function to add the admin
      await addAdmin(email, productManagerName);
      console.log('Admin added successfully');
      // Here, you can add logic to refresh data or update the UI
    } catch (error) {
      console.error('Error adding admin:', error);
      // Optionally, display an error message to the user
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
  const handleAddQuarter = async (year, quarter,isCurrent) => {
    try {
      // Call the addQ service function to update the current quarter
      await addQ(year, quarter,isCurrent);
      console.log('Current quarter updated successfully');
      // Update the UI or display a success message
    } catch (error) {
      console.error('Error updating current quarter:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <DataProvider>
      <div className="admin-page" style={{ padding: '20px' }}>
        {/* Button to toggle Product Managers Table visibility */}
        <Button
          variant="contained"
          style={{ backgroundColor: '#58D64D', width: '350px', height: '60px', marginBottom: '20px' }}
          onClick={toggleTableVisibility}
        >
          {showTable ? 'Hide Product Managers Table' : 'Show Product Managers Table'}
        </Button>

        {/* Render Product Managers Table if showTable is true */}
        {showTable && <ProductManagersTable />}

        {/* Button to toggle Groups Table visibility */}
        <Button
          variant="contained"
          style={{ backgroundColor: '#58D64D', width: '350px', height: '60px', marginBottom: '20px', marginLeft: '10%' }}
          onClick={toggleGroupsTableVisibility}
        >
          {showGroupsTable ? 'Hide Groups Table' : 'Show Groups Table'}
        </Button>

        {/* Render Groups Table if showGroupsTable is true */}
        {showGroupsTable && <GroupTable />}

        {/* Button to open AddAdminDialog */}
        <Button
          variant="contained"
          style={{ backgroundColor: '#FFA500', width: '350px', height: '60px', marginTop: '20px' }}
          onClick={openAdminDialog}
        >
          Add New Admin
        </Button>

        {/* AddAdminDialog component */}
        <AddAdminDialog open={adminDialogOpen} onClose={closeAdminDialog} onSubmit={handleAddAdmin} />

        {/* Button to open SelectQuarterDialog */}
        <Button
          variant="contained"
          style={{ backgroundColor: '#00C2FF', width: '350px', height: '60px', marginTop: '20px', marginLeft: '10%' }}
          onClick={openQuarterDialog}
        >
          Update Current Quarter
        </Button>

        {/* SelectQuarterDialog component */}
        <SelectQuarterDialog open={quarterDialogOpen} onClose={closeQuarterDialog} onSubmit={handleAddQuarter} />
      </div>
    </DataProvider>
  );
}
