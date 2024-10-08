
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exportTable,getRequestPeriod } from './services';
import { useDataContext } from './Contexts/DataContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  List,
  ListItem,
  IconButton,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import LinkIcon from '@mui/icons-material/Link';
import MyModal from './addRequest';
import DraggableRow from './DraggableRow';
import { updateIdRow } from './services';



const ItemType = 'ROW';

const BasicTable = () => {
  const navigate = useNavigate();

  const {
    group: [group],
    productManager: [,],
    finalDecision: [finalDecision],
    quarterDates: [quarterDates],
    requestorNames: [requestorNames],
    priorityOptions: [priorityOptions],
    descriptions: [descriptions],
    productEmail: [,],
    status: [status],
    refreshRows,
  } = useDataContext();

  const [showGroups, setShowGroups] = useState(false);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterRequestorGroup, setFilterRequestorGroup] = useState([]);
  const [filterRequestorName, setFilterRequestorName] = useState([]);
  const [filterInvolvedName, setFilterInvolvedName] = useState([]);
  const [finalDecisionChose, setFinalDecisionChose] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [requestPeriod, setRequestPeriod] = useState({ startDate: null, endDate: null });

  const fetchData = async () => {
    refreshRows();
  };

  useEffect(() => {
    const setData = async () => {
      setRows(descriptions);
      setFilteredRows(descriptions);
    };
    setData();
    // fetchData()
  }, [group, finalDecision, quarterDates, requestorNames, priorityOptions, descriptions, status]);

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const fetchRequestPeriod = async () => {
      const periodData = await getRequestPeriod();
      if (periodData) {
        setRequestPeriod({
          startDate: new Date(periodData.start),
          endDate: new Date(periodData.end),
        });
      }
    };

    fetchRequestPeriod();
  }, []);


  const toggleGroups = () => {
    setShowGroups(!showGroups);
  };

  const moveRow = async (dragIndex, hoverIndex) => {
    const dragRow = rows[dragIndex];
    const hoverRow = rows[hoverIndex];

    const newRows = [...rows];
    newRows.splice(dragIndex, 1);
    newRows.splice(hoverIndex, 0, dragRow);
    setRows(newRows);
    setFilteredRows(newRows);

    try {
      await updateIdRow(dragRow.id, hoverRow.id);
      console.log(`Successfully updated idDrag values for id1: ${dragRow.id} and id2: ${hoverRow.id}`);
    } catch (error) {
      console.error(`Error updating idDrag values: ${error} idDrag values for id1: ${dragRow.id} and id2: ${hoverRow.id}`);
    }
  };

  const handleFilterChange = () => {
    let newFilteredRows = rows;
    if (filterRequestorGroup.length > 0) {
      newFilteredRows = newFilteredRows.filter(item => filterRequestorGroup.includes(item.requestorGroup));
    }
    if (filterRequestorName.length > 0) {
      newFilteredRows = newFilteredRows.filter(item => filterRequestorName.includes(item.productmanagername));
    }
    if (filterInvolvedName.length > 0) {
      newFilteredRows = newFilteredRows.filter(item => {
        const filteredGroups = item.affectedGroupsList.filter(item2 => item2.statusname !== 'Not Required');
        const groupNames = filteredGroups.map(item2 => item2.groupname);
        return groupNames.some(groupname => filterInvolvedName.includes(groupname));
      });
    }
    setFilteredRows(newFilteredRows);
  };

  useEffect(() => {
    handleFilterChange();
  }, [filterRequestorGroup, filterRequestorName, filterInvolvedName]);

  const showModal = () => {
    const currentDate = new Date();
    if (currentDate >= requestPeriod.startDate && currentDate <= requestPeriod.endDate) {
      setModalVisible(true);
    } else {
      console.log(currentDate);
      alert('The request period is currently closed. You cannot add a new request at this time.');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const goToAdminPage = () => {
    // Check if the user is an admin before navigating
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (isAdmin) {
      navigate('/admin');
    } else {
      alert('You do not have access to the admin page');
    }
  };

  const addRequest = (newRequest) => {
    setRows((prevRows) => [...prevRows, newRequest]);
    setFilteredRows((prevRows) => [...prevRows, newRequest]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppBar position="sticky" style={{ backgroundColor: '#491688' }}>

      <Toolbar>
  <Typography variant="h6" style={{ flexGrow: 1 }}>
    Dependencies Planner PRD
  </Typography>

  <Button
    variant="contained"
    className="custom-button"
    startIcon={<SaveAltIcon className="custom-button-icon" />}
    onClick={exportTable}
    sx={{ mr: 2 }} // Add spacing here
  >
    Export Table
  </Button>

  <Button
    variant="contained"
    className="custom-button"
    startIcon={<AdminPanelSettingsIcon className="custom-button-icon" />}
    onClick={goToAdminPage}
  >
    Admin Page
  </Button>
</Toolbar>

      </AppBar>
      <div className="container">
        <div className="sidebar">
          <List>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="filter-requestor-group-label">Filter by Requestor Group</InputLabel>
                <Select
                  multiple
                  value={filterRequestorGroup}
                  label="Filter by Requestor Group"
                  onChange={(e) => setFilterRequestorGroup(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => selected.join(', ')}
                >
                  {group.map((groupOption, groupIndex) => (
                    <MenuItem value={groupOption} key={groupIndex}>
                      <Checkbox checked={filterRequestorGroup.indexOf(groupOption) > -1} />
                      <ListItemText primary={groupOption} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="filter-requestor-name-label">Filter by Requestor Name</InputLabel>
                <Select
                  multiple
                  value={filterRequestorName}
                  label="Filter by Requestor Name"
                  onChange={(e) => setFilterRequestorName(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => selected.join(', ')}
                >
                  {requestorNames.map((nameOption, nameIndex) => (
                    <MenuItem value={nameOption} key={nameIndex}>
                      <Checkbox checked={filterRequestorName.indexOf(nameOption) > -1} />
                      <ListItemText primary={nameOption} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="filter-involved-name-label"><div>Filter by Involved Group</div></InputLabel>
                <Select
                  multiple
                  value={filterInvolvedName}
                  label="Filter by Involved Group"
                  onChange={(e) => setFilterInvolvedName(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => selected.join(', ')}
                >
                  {group.map((groupOption, groupIndex) => (
                    <MenuItem value={groupOption} key={groupIndex}>
                      <Checkbox checked={filterInvolvedName.indexOf(groupOption) > -1} />
                      <ListItemText primary={groupOption} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ListItem>
          </List>
          <Button
  variant="contained"
  sx={{
    background: '#491688', // Navbar color
    borderRadius: 4, // 90-degree angles
    padding: '12px 25px',
    color: 'white',
    fontWeight:'light',
    boxShadow: '0 4px 6px 3px rgba(90, 0, 225, 0.2)',
    transition: 'background 0.3s ease', // Smooth transition effect
    '&:hover': {
      background: 'linear-gradient(45deg, #5A00E1 30%, #00C2FF 90%)',
      boxShadow: '0 6px 8px 3px rgba(90, 0, 225, 0.3)',
    },
    // alignSelf: 'flex-end', // Align button to the right
    marginRight: '15px', // Add right margin to move further
    marginLeft: '15px',
    width: '165px', // Maintain consistent width
    marginTop: 'auto', // Push the button to the bottom of the sidebar
  }}
  startIcon={<AddCircleOutlineIcon />}
  onClick={showModal} // Keeping the click handler
>
  Add Request
</Button>
        </div>
        <div className="table-wrapper">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="highlight-header">
                        <div className='columnName'>Requestor Group</div><ExpandCircleDownIcon className="table-header-icon" />
                      </TableCell>
                      <TableCell className="highlight-header">
                        <div className='columnName'>Requestor Name</div><ExpandCircleDownIcon className="table-header-icon" />
                      </TableCell>
                      <TableCell className="highlight-header">
                        <div className='columnName'>Title</div><FormatAlignLeftIcon className="table-header-icon" />
                      </TableCell>
                      <TableCell className="highlight-header">
                        <div className='columnName'>Planned</div><FormatAlignLeftIcon className="table-header-icon" />
                      </TableCell>
                      <TableCell className="highlight-header">
                        <div className='columnName'>Description</div><FormatAlignLeftIcon className="table-header-icon" />
                      </TableCell>
                      <TableCell className="highlight-header">
                        <div className='columnName'>Priority</div><ExpandCircleDownIcon className="table-header-icon" />
                      </TableCell>
                      <TableCell className="highlight-header">
                        <div className='columnName'>Final Decision</div><ExpandCircleDownIcon className="table-header-icon" />
                      </TableCell>
                      <TableCell className="highlight-header"><div className='columnName'>Show Group</div>
                        <IconButton onClick={toggleGroups} color="inherit">
                          {showGroups ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </TableCell>
                      {showGroups && group.map((item, index) => (
                        <TableCell className="highlight-header" key={index}>
                          <div className='columnName'>{item}</div><ExpandCircleDownIcon className="table-header-icon" />
                        </TableCell>
                      ))}
                      <TableCell className="highlight-header">
                        <div className='columnName'>Comments</div><FormatAlignLeftIcon className="table-header-icon" />
                      </TableCell>
                      <TableCell className="highlight-header">
                        <div className='columnName'>Jira Link</div><LinkIcon className="table-header-icon" />
                      </TableCell>
                      <TableCell className="highlight-header">
                        <div className='columnName'>Additional actions</div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.map((row, index) => (
                      <DraggableRow
                        key={index}
                        index={index}
                        row={row}
                        moveRow={moveRow}
                        showGroups={showGroups}
                        group={group}
                        status={status}
                        priorityOptions={priorityOptions}
                        quarterDates={quarterDates}
                        finalDecision={finalDecision}
                        requestorNames={requestorNames}
                        setRows={setRows}
                        fetchData={fetchData}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      <MyModal visible={modalVisible} onClose={closeModal} onOk={closeModal} onAddRequest={addRequest} />
    </DndProvider>
  );
};

export default BasicTable;

