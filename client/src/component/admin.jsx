import ProductManagersTable from './productManagersTable';
import GroupTable from './groupTable'
import React, { useState } from 'react';
import { DataProvider } from './Contexts/DataContext';
import Button from '@mui/material/Button';
export default function Admin(){
    const [showTable, setShowTable] = useState(false);
    const [showGroupsTable, setShowGroupsTable] = useState(false);
    const toggleTableVisibility = () => {
        setShowTable((prevShowTable) => !prevShowTable);
      };
      const toggleGroupsTableVisibility = () => {
        setShowGroupsTable((prevShowTable) => !prevShowTable);
      };
    
    return(
        <DataProvider>
        <div className="admin-page">
          <Button style={{ backgroundColor: '#58D64D', width: '350px' ,height:'300px'}}onClick={toggleTableVisibility}>
            {showTable ? 'Hide Product Managers Table' : 'Show Product Managers Table'}
          </Button>
          {showTable && <ProductManagersTable />}
          <Button style={{ backgroundColor: '#58D64D' , width: '350px' ,height:'300px',marginLeft:'10%'}} onClick={toggleGroupsTableVisibility} className="toggle-button">
          {showGroupsTable ? 'Hide Groups Table' : 'Show Groups Table'}
        </Button>
        {showGroupsTable && <GroupTable />}
        </div>
      </DataProvider>
    )
}



