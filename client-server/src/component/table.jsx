import React, { useEffect, useState, useRef } from 'react';
import {exportTable} from './services'
import { useDataContext } from './Contexts/DataContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './BasicTable.css';
import { Select, MenuItem, Checkbox, ListItemText, List, ListItem, Divider, IconButton, FormControl, InputLabel, Card, CardContent, AppBar, Toolbar, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import LinkIcon from '@mui/icons-material/Link';
import DeleteComponent from './deleteReq'
import MyModal from './addRequest';
import DraggableRow from './DraggableRow';
const ItemType = 'ROW';
const BasicTable = () => {
  const {
    group: [group, setGroup],
    productManager: [productManager, setProductManager],
    finalDecision: [finalDecision, setFinalDecision],
    quarterDates: [quarterDates, setQuarterDates],
    requestorNames: [requestorNames, setRequestorNames],
    priorityOptions: [priorityOptions, setPriorityOptions],
    descriptions: [descriptions, setDescriptions],
    productEmail: [productEmail, setProductEmail],
    status: [status, setStatus]
  } = useDataContext();
  console.log()
  const [showGroups, setShowGroups] = useState(false);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filterRequestorGroup, setFilterRequestorGroup] = useState([]);
  const [filterRequestorName, setFilterRequestorName] = useState([]);
  const [filterInvolvedName, setFilterInvolvedName] = useState([]);
  const [finalDecisionChose, setFinalDecisionChose] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setRows(descriptions);
      setFilteredRows(descriptions);

    };
    fetchData();
  }, [group,
    finalDecision,
    quarterDates,
    requestorNames,
    priorityOptions,
    descriptions,
    productEmail,
    status]);

  const toggleGroups = () => {
    setShowGroups(!showGroups);
  };

  const moveRow = (dragIndex, hoverIndex) => {
    const dragRow = rows[dragIndex];
    const newRows = [...rows];
    newRows.splice(dragIndex, 1);
    newRows.splice(hoverIndex, 0, dragRow);
    setRows(newRows);
    setFilteredRows(newRows);
  };

  const handleFilterChange = () => {
    let newFilteredRows = rows;
    if (filterRequestorGroup.length > 0) {
      newFilteredRows = newFilteredRows?.filter(item => filterRequestorGroup.includes(item.requestorGroup))
    }
    if (filterRequestorName.length > 0) {
      newFilteredRows = newFilteredRows?.filter(item => filterRequestorName.includes(item.productmanagername));
    }
    if (filterInvolvedName.length > 0) {
      newFilteredRows = newFilteredRows?.filter(item => {
       
        const filteredGroups = item.affectedGroupsList.filter(item2 => item2.statusname !== 'Not Required');
       
        const groupNames = filteredGroups.map(item2 => item2.groupname);
       
        return groupNames.some(groupname => filterInvolvedName.includes(groupname));
      });
    };
      setFilteredRows(newFilteredRows);   
  }

  useEffect(() => {
    handleFilterChange();
  }, [filterRequestorGroup, filterRequestorName, filterInvolvedName]);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppBar position="static" style={{ backgroundColor: '#00C2FF' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Dependencies Planner PRD
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            style={{ backgroundColor: '#58D64D', marginRight: '10px' }}
            onClick={showModal}
          >
            Add Request
          </Button>
        <Button
            variant="contained"
            color="primary"
            startIcon={<SaveAltIcon />}
            style={{ backgroundColor: '#58D64D', marginRight: '10px' }}
             onClick={exportTable}
          >
            Export Table
          </Button>
        <MyModal />
          <IconButton onClick={toggleGroups} color="inherit">
            {showGroups ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
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
                      {/* <TableCell className="highlight-header"><div className='columnName'>
                        <IconButton onClick={toggleGroups} color="inherit">
                          {showGroups ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </div></TableCell> */}
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
                        <div className='columnName'>Delete Request</div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.map((row, index) => ( // HIGHLIGHTED
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
                        style={{ cursor: "grab" }}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
      </div>
   
      <MyModal visible={modalVisible} onClose={closeModal} />
    </DndProvider>
  );
};

export default BasicTable;