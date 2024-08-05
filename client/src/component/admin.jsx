// import ProductManagersTable from './productManagersTable';
// import GroupTable from './groupTable';

// import React, { useState } from 'react';
// import { DataProvider } from './Contexts/DataContext';
// import Button from '@mui/material/Button';
// export default function Admin(){
//     const [showTable, setShowTable] = useState(false);
//     const [showGroupsTable, setShowGroupsTable] = useState(false);
//     const toggleTableVisibility = () => {
//         setShowTable((prevShowTable) => !prevShowTable);
//       };
//       const toggleGroupsTableVisibility = () => {
//         setShowGroupsTable((prevShowTable) => !prevShowTable);
//       };
    
//     return(
//         <DataProvider>
//         <div className="admin-page">
//           <Button style={{ backgroundColor: '#58D64D', width: '350px' ,height:'300px'}}onClick={toggleTableVisibility}>
//             {showTable ? 'Hide Product Managers Table' : 'Show Product Managers Table'}
//           </Button>
//           {showTable && <ProductManagersTable />}
//           <Button style={{ backgroundColor: '#58D64D' , width: '350px' ,height:'300px',marginLeft:'10%'}} onClick={toggleGroupsTableVisibility} className="toggle-button">
//           {showGroupsTable ? 'Hide Groups Table' : 'Show Groups Table'}
//         </Button>
//         {showGroupsTable && <GroupTable />}
//         </div>
//       </DataProvider>
//     )
// }

// Import necessary components and hooks
import React, { useState } from 'react';
import ProductManagersTable from './productManagersTable';
import GroupTable from './groupTable';
import { DataProvider } from './Contexts/DataContext';
import Button from '@mui/material/Button';
import AddAdminDialog from './AddAdminDialog'; // Import the AddAdminDialog component
import { addAdmin } from './services'; // Import the addAdmin function

// Admin Component
export default function Admin() {
  // State variables for showing tables and dialog
  const [showTable, setShowTable] = useState(false);
  const [showGroupsTable, setShowGroupsTable] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false); // State for controlling dialog visibility

  // Toggle function to show/hide Product Managers Table
  const toggleTableVisibility = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  // Toggle function to show/hide Groups Table
  const toggleGroupsTableVisibility = () => {
    setShowGroupsTable((prevShowTable) => !prevShowTable);
  };

  // Function to open the AddAdminDialog
  const openDialog = () => {
    setDialogOpen(true);
  };

  // Function to close the AddAdminDialog
  const closeDialog = () => {
    setDialogOpen(false);
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
          onClick={openDialog}
        >
          Add New Admin
        </Button>

        {/* AddAdminDialog component */}
        <AddAdminDialog open={dialogOpen} onClose={closeDialog} onSubmit={handleAddAdmin} />
      </div>
    </DataProvider>
  );
}


