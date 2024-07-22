

import React, { useEffect, useState, useRef } from 'react';
import { useGroupContext } from './groupContext';
import { getGroup, getAllStatus, getFinalDecision, getQuarterDates, getRequestorNames, getPriority, getDescriptions } from './services';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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
import MyModal from './addRequest';





const ItemType = 'ROW';

const DraggableRow = ({ row, index, moveRow, showGroups, group, status, priorityOptions, quarterDates, finalDecision, requestorNames }) => {
  const ref = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState(row.affectedGroupsList || '');
  const [selectedPriority, setSelectedPriority] = useState(row.critical || '');
  const [selectedPlanned, setSelectedPlanned] = useState(row.planned || '');
  const [selectedRequestorGroup, setSelectedRequestorGroup] = useState(row.requestorGroup || '');
  const [selectedFinalDecision, setSelectedFinalDecision] = useState(row.decision || '');
  const [selectedRequestorName, setSelectedRequestorName] = useState(row.productmanagername || '');

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleStatusChange = (value, groupIndex) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [groupIndex]: value,
    }));
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handlePlannedChange = (event) => {
    setSelectedPlanned(event.target.value);
  };

  const handleRequestorGroupChange = (event) => {
    setSelectedRequestorGroup(event.target.value);
  };

  const handleFinalDecisionChange = (event) => {
    setSelectedFinalDecision(event.target.value);
  };

  const handleRequestorNameChange = (event) => {
    setSelectedRequestorName(event.target.value);
  };

  const getFinalDecisionBackgroundColor = (decision) => {
    switch (decision) {
      case 'inQ':
        return '#b7cab8';
      case 'notInQ':
        return '#d4c0bd';
      default:
        return 'transparent';
    }
  };
  const getPriorityBackgroundColor = (priority) => {
    switch (priority) {
      case 'critical':
        return '#ffcccc';
      case 'high':
        return '#ffd9b3';
      case 'medium':
        return '#ffffb3';
      case 'low':
        return '#e6ffe6';
      default:
        return 'transparent';
    }
  };
  const groupBackgroundColor = '#d3d3d3';

  return (
    <TableRow
      ref={ref}
      style={{ 
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "url('/waving-hand-cursor.png'), auto" : "grab" 
      }}
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Select
          value={selectedRequestorGroup}
          onChange={handleRequestorGroupChange}
          displayEmpty
        >
          {group.map((groupOption, groupIndex) => (
            <MenuItem value={groupOption} key={groupIndex} style={{ backgroundColor: groupBackgroundColor }}>
              {groupOption}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>
        <Select
          value={selectedRequestorName}
          onChange={handleRequestorNameChange}
          displayEmpty
          style={{ backgroundColor: '#d3d3d3' }}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor:'#d3d3d3',
              }
            }
          }}
        >
          {requestorNames.map((nameOption, nameIndex) => (
            <MenuItem value={nameOption} key={nameIndex}>
              {nameOption}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>{row.title}</TableCell>
      <TableCell align="right">
        <Select
          value={selectedPlanned}
          onChange={handlePlannedChange}
          displayEmpty
          style={{ backgroundColor: '#d3d3d3' }}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor:'#d3d3d3',
              }
            }
          }}
         
        >
          {quarterDates.map((dateOption, dateIndex) => (
            <MenuItem value={dateOption} key={dateIndex}>
              {dateOption}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>
        <Select
          value={selectedPriority}
          onChange={handlePriorityChange}
          displayEmpty
          style={{ backgroundColor: getPriorityBackgroundColor(selectedPriority), padding: '0.2em' }}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: getPriorityBackgroundColor(selectedPriority),
              }
            }
          }}
        >
          {priorityOptions.map((priorityOption, priorityIndex) => (
            <MenuItem value={priorityOption} key={priorityIndex}>
              {priorityOption}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell>
        <Select
          value={selectedFinalDecision}
          onChange={handleFinalDecisionChange}
          displayEmpty
          style={{ backgroundColor: getFinalDecisionBackgroundColor(selectedFinalDecision), padding: '0.2em' }}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: getFinalDecisionBackgroundColor(selectedFinalDecision),
              }
            }
          }}
        >
          {finalDecision.map((decisionOption, decisionIndex) => (
            <MenuItem value={decisionOption} key={decisionIndex}>
              {decisionOption}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      {showGroups && group.map((item, groupIndex) => (
        <TableCell align="right" key={groupIndex} 
>
          <Select
            value={selectedStatus[groupIndex]?.statusname || 'Pending Response'}
            onChange={(e) => handleStatusChange(e.target.value, groupIndex)}
            displayEmpty
            renderValue={(selected) => selected || 'Pending Response'}
          >
            {status.map((statusOption, statusIndex) => (
              <MenuItem value={statusOption} key={statusIndex}>
                {statusOption}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
      ))}
      <TableCell align="right">{row.comment}</TableCell>
      <TableCell align="right"><a href={row.jiralink}>Jira Link</a></TableCell>
    </TableRow>
  );
};

const BasicTable = () => {
  const { group, setGroup } = useGroupContext();
  const [showGroups, setShowGroups] = useState(false);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [finalDecision, setFinalDecision] = useState([]);
  const [quarterDates, setQuarterDates] = useState([]);
  const [requestorNames, setRequestorNames] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [status, setStatus] = useState([]);
  const [filterRequestorGroup, setFilterRequestorGroup] = useState([]);
  const [filterRequestorName, setFilterRequestorName] = useState([]);
  const [filterInvolvedName, setFilterInvolvedName] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const groupData = await getGroup();
        setGroup(groupData);

        const finalDecisionData = await getFinalDecision();
        setFinalDecision(finalDecisionData);

        const quarterDatesData = await getQuarterDates();
        setQuarterDates(quarterDatesData);

        const requestorNamesData = await getRequestorNames();
        setRequestorNames(requestorNamesData);

        const statusData = await getAllStatus();
        setStatus(statusData);

        const descriptionsData = await getDescriptions();
        setDescriptions(descriptionsData);
        setRows(descriptionsData);
        setFilteredRows(descriptionsData);

        const priorityData = await getPriority();
        setPriorityOptions(priorityData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [setGroup]);

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
      newFilteredRows = newFilteredRows.filter(row => filterRequestorGroup.includes(row.requestorGroup));
    }
    if (filterRequestorName.length > 0) {
      newFilteredRows = newFilteredRows.filter(row => filterRequestorName.includes(row.productmanagername));
    }
    setFilteredRows(newFilteredRows);
  };

  useEffect(() => {
    handleFilterChange();
  }, [filterRequestorGroup, filterRequestorName]);

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <AppBar position="static" style={{backgroundColor: '#00C2FF'}}>
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows.map((row, index) => {
                      const finalDecisionBackgroundColor = row.decision === 'inQ' ? '#b7cab8' : row.decision === 'notInQ' ? '#d4c0bd' : 'transparent';
                      const priorityBackgroundColor = row.critical==='low' ? '#e6ffe6' : row.critical==='high' ? '#ffd9b3' :row.critical==='medium' ? '#ffffb3':row.critical==='critical' ? '#ffcccc' : 'transparent';

                      return (
                        <TableRow
                          key={index}
                          style={{ cursor: "grab" }}
                        >
                          <TableCell>
                            <Select
                              value={row.requestorGroup}
                              displayEmpty
                              style={{ backgroundColor: '#d3d3d3', padding: '0.2em' }}
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    backgroundColor: '#d3d3d3',
                                  }
                                }
                              }}
                            >
                              {group.map((groupOption, groupIndex) => (
                                <MenuItem value={groupOption} key={groupIndex}>
                                  {groupOption}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={row.productmanagername}
                              displayEmpty

                            >
                              {requestorNames.map((nameOption, nameIndex) => (
                                <MenuItem value={nameOption} key={nameIndex}>
                                  {nameOption}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>{row.title}</TableCell>
                          <TableCell align="right">
                            <Select
                              value={row.planned}
                              displayEmpty
                              style={{ backgroundColor: '#d3d3d3', padding: '0.2em' }}
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    backgroundColor:'#d3d3d3', 
                                  }
                                }
                              }}
                            >
                              {quarterDates.map((dateOption, dateIndex) => (
                                <MenuItem value={dateOption} key={dateIndex}>
                                  {dateOption}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell>
                            <Select
                              value={row.critical}
                              displayEmpty
                              style={{ backgroundColor: priorityBackgroundColor, padding: '0.2em' }}
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    backgroundColor: priorityBackgroundColor,
                                  }
                                }
                              }}
                            >
                              {priorityOptions.map((priorityOption, priorityIndex) => (
                                <MenuItem value={priorityOption} key={priorityIndex}>
                                  {priorityOption}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={row.decision}
                              displayEmpty
                              style={{ backgroundColor: finalDecisionBackgroundColor, padding: '0.2em' }}
                              MenuProps={{
                                PaperProps: {
                                  style: {
                                    backgroundColor: finalDecisionBackgroundColor,
                                  }
                                }
                              }}
                            >
                              {finalDecision.map((decisionOption, decisionIndex) => (
                                <MenuItem value={decisionOption} key={decisionIndex}>
                                  {decisionOption}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          {showGroups && group.map((item, groupIndex) => (
                            <TableCell align="right" key={groupIndex}>
                              <Select
                                value={row.affectedGroupsList[groupIndex]?.statusname || 'Pending Response'}
                                displayEmpty
                                renderValue={(selected) => selected || 'Pending Response'}
                              >
                                {status.map((statusOption, statusIndex) => (
                                  <MenuItem value={statusOption} key={statusIndex}>
                                    {statusOption}
                                  </MenuItem>
                                ))}
                              </Select>
                            </TableCell>
                          ))}
                          <TableCell align="right">{row.comment}</TableCell>
                          <TableCell align="right"><a href={row.jiralink}>Jira Link</a></TableCell>
                        </TableRow>
                      );
                    })}
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



// import React, { useEffect, useState, useRef } from 'react';
// import { useGroupContext } from './groupContext';
// import { getGroup, getAllStatus, getFinalDecision, getQuarterDates, getRequestorNames, getPriority, getDescriptions } from './services';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import Button from '@mui/material/Button';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import './BasicTable.css';
// import { Select, MenuItem, Checkbox, ListItemText, List, ListItem, Divider, IconButton, FormControl, InputLabel, Card, CardContent, AppBar, Toolbar, Typography } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import LinkIcon from '@mui/icons-material/Link';
// import MyModal from './addRequest';



// // const ItemType = 'ROW';
// // const DraggableRow = ({ row, index, moveRow, showGroups, group, status, priorityOptions, quarterDates, finalDecision, requestorNames }) => {
// //   const ref = useRef(null);
// //   // const [selectedStatus, setSelectedStatus] = useState(Array(group.length).fill('Pending Response'));
// //   const [selectedStatus, setSelectedStatus] = useState(row.affectedGroupsList|| '');
// //   // {row.affectedGroupsList.map((group, idx) => (
// //   //         <div key={idx}>
// //   //           {group.groupname}: {group.statusname}
// //   //         </div>
// //   //       ))}
// //         console.log("mee"+row.affectedGroupsList)
// //   const [selectedPriority, setSelectedPriority] = useState(row.critical || '');
// //   const [selectedPlanned, setSelectedPlanned] = useState(row.planned || '');
// //   const [selectedRequestorGroup, setSelectedRequestorGroup] = useState(row.requestorGroup || '');
// //   const [selectedFinalDecision, setSelectedFinalDecision] = useState(row.decision || '');
// //   const [selectedRequestorName, setSelectedRequestorName] = useState(row.productmanagername || '');
// //   const [, drop] = useDrop({
// //     accept: ItemType,
// //     hover: (item, monitor) => {
// //       if (!ref.current) {
// //         return;
// //       }
// //       const dragIndex = item.index;
// //       const hoverIndex = index;
// //       if (dragIndex === hoverIndex) {
// //         return;
// //       }
// //       const hoverBoundingRect = ref.current?.getBoundingClientRect();
// //       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
// //       const clientOffset = monitor.getClientOffset();
// //       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
// //       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
// //         return;
// //       }
// //       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
// //         return;
// //       }
// //       moveRow(dragIndex, hoverIndex);
// //       item.index = hoverIndex;
// //     },
// //   });
// //   const [{ isDragging }, drag] = useDrag({
// //     type: ItemType,
// //     item: { type: ItemType, index },
// //     collect: (monitor) => ({
// //       isDragging: monitor.isDragging(),
// //     }),
// //   });
// //   drag(drop(ref));
// //   const handleStatusChange = (value, groupIndex) => {
// //     setSelectedStatus((prev) => ({
// //       ...prev,
// //       [groupIndex]: value,
// //     }));
// //   };

// //   const handlePriorityChange = (event) => {
// //     setSelectedPriority(event.target.value);
// //   };

// //   const handlePlannedChange = (event) => {
// //     setSelectedPlanned(event.target.value);
// //   };

// //   const handleRequestorGroupChange = (event) => {
// //     setSelectedRequestorGroup(event.target.value);
// //   };

// //   const handleFinalDecisionChange = (event) => {
// //     setSelectedFinalDecision(event.target.value);
// //   };

// //   const handleRequestorNameChange = (event) => {
// //     setSelectedRequestorName(event.target.value);
// //   };

// //   return (
// //     <TableRow
// //       ref={ref}
// //       style={{ 
// //         opacity: isDragging ? 0.5 : 1,
// //         cursor: isDragging ? "url('/waving-hand-cursor.png'), auto" : "grab" 
// //       }}
// //       key={index}
// //       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
// //     >
// //       <TableCell>
// //         <Select
// //           value={selectedRequestorGroup}
// //           onChange={handleRequestorGroupChange}
// //           displayEmpty
// //         >
// //           {group.map((groupOption, groupIndex) => (
// //             <MenuItem value={groupOption} key={groupIndex}>
// //               {groupOption}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </TableCell>
// //       <TableCell >
// //         <Select
// //           value={selectedRequestorName}
// //           onChange={handleRequestorNameChange}
// //           displayEmpty
// //         >
// //           {requestorNames.map((nameOption, nameIndex) => (
// //             <MenuItem value={nameOption} key={nameIndex}>
// //               {nameOption}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </TableCell>
// //       <TableCell>{row.title}</TableCell>
// //       <TableCell align="right">
// //         <Select
// //           value={selectedPlanned}
// //           onChange={handlePlannedChange}
// //           displayEmpty
// //         >
// //           {quarterDates.map((dateOption, dateIndex) => (
// //             <MenuItem value={dateOption} key={dateIndex}>
// //               {dateOption}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </TableCell>
// //       <TableCell>{row.description}</TableCell>
// //       <TableCell>
// //         <Select
// //           value={selectedPriority}
// //           onChange={handlePriorityChange}
// //           displayEmpty
// //         >
// //           {priorityOptions.map((priorityOption, priorityIndex) => (
// //             <MenuItem value={priorityOption} key={priorityIndex}>
// //               {priorityOption}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </TableCell>
// //       <TableCell>
// //         <Select
// //           value={selectedFinalDecision}
// //           onChange={handleFinalDecisionChange}
// //           displayEmpty
// //         >
// //           {finalDecision.map((decisionOption, decisionIndex) => (
// //             <MenuItem value={decisionOption} key={decisionIndex}>
// //               {decisionOption}
// //             </MenuItem>
// //           ))}
// //         </Select>
// //       </TableCell>
// //       {showGroups && group.map((item, groupIndex) => (
// //         <TableCell align="right" key={groupIndex}>
// //           <Select
// //             value={selectedStatus[groupIndex].statusname || 'Pending Response'}
// //             onChange={(e) => handleStatusChange(e.target.value, groupIndex)}
// //             displayEmpty
// //             renderValue={(selected) => selected || 'Pending Response'}
// //           >
// //             {status.map((statusOption, statusIndex) => (
// //               <MenuItem value={statusOption} key={statusIndex}>
// //                 {statusOption}
// //               </MenuItem>
// //             ))}
// //           </Select>
// //         </TableCell>
// //       ))}
// //       <TableCell align="right">{row.comment}</TableCell>
// //       <TableCell align="right"><a href={row.jiralink}>Jira Link</a></TableCell>
// //     </TableRow>
// //   );
// // };

// // const BasicTable = () => {
// //   const { group, setGroup } = useGroupContext();
// //   const [showGroups, setShowGroups] = useState(false);
// //   const [rows, setRows] = useState([]);
// //   const [filteredRows, setFilteredRows] = useState([]);
// //   const [finalDecision, setFinalDecision] = useState([]);
// //   const [quarterDates, setQuarterDates] = useState([]);
// //   const [requestorNames, setRequestorNames] = useState([]);
// //   const [priorityOptions, setPriorityOptions] = useState([]);
// //   const [descriptions, setDescriptions] = useState([]);
// //   const [status, setStatus] = useState([]);
// //   const [filterRequestorGroup, setFilterRequestorGroup] = useState([]);
// //   const [filterRequestorName, setFilterRequestorName] = useState([]);
// //   const [filterInvolvedName, setFilterInvolvedName] = useState([]);
// //   const [modalVisible, setModalVisible] = useState(false);


// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const groupData = await getGroup();
// //         setGroup(groupData);

// //         const finalDecisionData = await getFinalDecision();
// //         setFinalDecision(finalDecisionData);

// //         const quarterDatesData = await getQuarterDates();
// //         setQuarterDates(quarterDatesData);

// //         const requestorNamesData = await getRequestorNames();
// //         setRequestorNames(requestorNamesData);

// //         const statusData = await getAllStatus();
// //         setStatus(statusData);

// //         const descriptionsData = await getDescriptions();
// //         setDescriptions(descriptionsData);
// //         console.log(descriptionsData)
// //         setRows(descriptionsData);
// //         setFilteredRows(descriptionsData);

// //         const priorityData = await getPriority();
// //         setPriorityOptions(priorityData);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       }
// //     };

// //     fetchData();
// //   }, [setGroup]);

// //   const toggleGroups = () => {
// //     setShowGroups(!showGroups);
// //   };

// //   const moveRow = (dragIndex, hoverIndex) => {
// //     const dragRow = rows[dragIndex];
// //     const newRows = [...rows];
// //     newRows.splice(dragIndex, 1);
// //     newRows.splice(hoverIndex, 0, dragRow);
// //     setRows(newRows);
// //     setFilteredRows(newRows);
// //   };

// //   const handleFilterChange = () => {
// //     let newFilteredRows = rows;
// //     if (filterRequestorGroup.length > 0) {
// //       newFilteredRows = newFilteredRows.filter(row => filterRequestorGroup.includes(row.requestorGroup));
// //     }
// //     if (filterRequestorName.length > 0) {
// //       newFilteredRows = newFilteredRows.filter(row => filterRequestorName.includes(row.productmanagername));
// //     }
// //     setFilteredRows(newFilteredRows);
// //   };

// //   useEffect(() => {
// //     handleFilterChange();
// //   }, [filterRequestorGroup, filterRequestorName]);

// //   const showModal = () => {
// //     setModalVisible(true);
// //   };

// //   const closeModal = () => {
// //     setModalVisible(false);
// //   };


// //   return (
// //     <DndProvider backend={HTML5Backend}>
// //       <AppBar position="static" style={{backgroundColor: '#00C2FF'}}>
// //         <Toolbar>
// //           <Typography variant="h6" style={{ flexGrow: 1 }}>
// //             Dependencies Planner PRD
// //           </Typography>
// //           <Button 
// //             variant="contained" 
// //             color="primary"
// //             startIcon={<AddCircleOutlineIcon />}
// //             style={{ backgroundColor: '#58D64D', marginRight: '10px' }}
// //             onClick={showModal}

// //           >
             
// //             Add Request
// //           </Button><MyModal/> 
// //           <IconButton onClick={toggleGroups} color="inherit">
// //           {showGroups ? <VisibilityOffIcon /> : <VisibilityIcon />}
// //           </IconButton>
// //         </Toolbar>
// //       </AppBar>
// //       <div className="container">
// //         <div className="sidebar">
// //           <List>
// //             <ListItem>
// //               <FormControl fullWidth>
// //                 <InputLabel id="filter-requestor-group-label">Filter by Requestor Group</InputLabel>
// //                 <Select
// //                   multiple
// //                   value={filterRequestorGroup}
// //                   label="Filter by Requestor Group"
// //                   onChange={(e) => setFilterRequestorGroup(e.target.value)}
// //                   displayEmpty
// //                   renderValue={(selected) => selected.join(', ')}
// //                 >
// //                   {group.map((groupOption, groupIndex) => (
// //                     <MenuItem value={groupOption} key={groupIndex}>
// //                       <Checkbox checked={filterRequestorGroup.indexOf(groupOption) > -1} />
// //                       <ListItemText primary={groupOption} />
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </ListItem>
// //             <ListItem>
// //               <FormControl fullWidth>
// //                 <InputLabel id="filter-requestor-name-label">Filter by Requestor Name</InputLabel>
// //                 <Select
// //                   multiple
// //                   value={filterRequestorName}
// //                   label="Filter by Requestor Name"
// //                   onChange={(e) => setFilterRequestorName(e.target.value)}
// //                   displayEmpty
// //                   renderValue={(selected) => selected.join(', ')}
// //                 >
// //                   {requestorNames.map((nameOption, nameIndex) => (
// //                     <MenuItem value={nameOption} key={nameIndex}>
// //                       <Checkbox checked={filterRequestorName.indexOf(nameOption) > -1} />
// //                       <ListItemText primary={nameOption} />
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </ListItem>
// //             <ListItem>
// //               <FormControl fullWidth>
// //                 <InputLabel id="filter-involved-name-label"><div >Filter by Involved Group</div></InputLabel>
// //                 <Select
// //                   multiple
// //                   value={filterInvolvedName}
// //                   label="Filter by Involved Group"
// //                   onChange={(e) => setFilterInvolvedName(e.target.value)}
// //                   displayEmpty
// //                   renderValue={(selected) => selected.join(', ')}
// //                 >
// //                   {group.map((groupOption, groupIndex) => (
// //                     <MenuItem value={groupOption} key={groupIndex}>
// //                       <Checkbox checked={filterInvolvedName.indexOf(groupOption) > -1} />
// //                       <ListItemText primary={groupOption} />
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </ListItem>
// //           </List>
// //         </div>
// //         <div className="table-wrapper">
// //           <Card sx={{ minWidth: 275 }}>
// //             <CardContent>
// //               <TableContainer component={Paper}>
// //                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
// //                   <TableHead>
// //                     <TableRow>
// //                       <TableCell className="highlight-header">
// //                         <div className='columnName'>Requestor Group</div><ExpandCircleDownIcon className="table-header-icon" />
// //                       </TableCell>
// //                       <TableCell className="highlight-header">
// //                         <div className='columnName'>Requestor Name</div><ExpandCircleDownIcon className="table-header-icon" />
// //                       </TableCell>
// //                       <TableCell className="highlight-header">
// //                         <div className='columnName'>Title</div><FormatAlignLeftIcon className="table-header-icon" />
// //                       </TableCell>
// //                       <TableCell className="highlight-header">
// //                         <div className='columnName'>Planned</div><FormatAlignLeftIcon className="table-header-icon" />
// //                       </TableCell>
// //                       <TableCell className="highlight-header">
// //                         <div className='columnName'>Description</div><FormatAlignLeftIcon className="table-header-icon" />
// //                       </TableCell>
// //                       <TableCell className="highlight-header">
// //                         <div className='columnName'>Priority</div><ExpandCircleDownIcon className="table-header-icon" />
// //                       </TableCell>
// //                       <TableCell className="highlight-header">
// //                         <div className='columnName'>Final Decision</div><ExpandCircleDownIcon className="table-header-icon" />
// //                       </TableCell>
// //                       <TableCell className="highlight-header"><div className='columnName'>
// //                       <IconButton onClick={toggleGroups} color="inherit">
// //                       {showGroups ? <VisibilityOffIcon /> : <VisibilityIcon />}
// //                       </IconButton>
// //                       </div>
// //                       </TableCell>
// //                       {showGroups && group.map((item, index) => (
// //                         <TableCell className="highlight-header" key={index}>
// //                           <div className='columnName'>{item}</div><ExpandCircleDownIcon className="table-header-icon" />
// //                         </TableCell>
// //                       ))}
// //                       <TableCell className="highlight-header">
// //                         <div className='columnName'>Comments</div><FormatAlignLeftIcon className="table-header-icon" />
// //                       </TableCell>
// //                       <TableCell className="highlight-header">
// //                         <div className='columnName'>Jira Link</div><LinkIcon className="table-header-icon" />
// //                       </TableCell>
// //                     </TableRow>
// //                   </TableHead>
// //                   <TableBody>
// //                     {filteredRows.map((row, index) => (
// //                       <DraggableRow
// //                         key={index}
// //                         index={index}
// //                         row={row}
// //                         moveRow={moveRow}
// //                         showGroups={showGroups}
// //                         group={group}
// //                         status={status}
// //                         priorityOptions={priorityOptions}
// //                         quarterDates={quarterDates}
// //                         finalDecision={finalDecision}
// //                         requestorNames={requestorNames}
// //                         style={{ cursor: "grab" }}
// //                       />
// //                     ))}
// //                   </TableBody>
// //                 </Table>
// //               </TableContainer>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //       <MyModal visible={modalVisible} onClose={closeModal} />
// //     </DndProvider>
// //   );
// // };

// // export default BasicTable;


// // import React, { useEffect, useState, useRef } from 'react';
// // import { useGroupContext } from './groupContext';
// // import { getGroup, getAllStatus, getFinalDecision, getQuarterDates, getRequestorNames, getPriority, getDescriptions } from './services';
// // import Table from '@mui/material/Table';
// // import TableBody from '@mui/material/TableBody';
// // import TableCell from '@mui/material/TableCell';
// // import TableContainer from '@mui/material/TableContainer';
// // import TableHead from '@mui/material/TableHead';
// // import TableRow from '@mui/material/TableRow';
// // import Paper from '@mui/material/Paper';
// // import Button from '@mui/material/Button';
// // import { DndProvider, useDrag, useDrop } from 'react-dnd';
// // import { HTML5Backend } from 'react-dnd-html5-backend';
// // import './BasicTable.css';
// // import { Select, MenuItem, Checkbox, ListItemText, List, ListItem, Divider, IconButton, FormControl, InputLabel, Card, CardContent, AppBar, Toolbar, Typography } from '@mui/material';
// // import VisibilityIcon from '@mui/icons-material/Visibility';
// // import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// // import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// // import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
// // import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// // import LinkIcon from '@mui/icons-material/Link';
// // import MyModal from './addRequest';



// const ItemType = 'ROW';

// const DraggableRow = ({ row, index, moveRow, showGroups, group, status, priorityOptions, quarterDates, finalDecision, requestorNames }) => {
//   const ref = useRef(null);
//   const [selectedStatus, setSelectedStatus] = useState(row.affectedGroupsList || '');
//   const [selectedPriority, setSelectedPriority] = useState(row.critical || '');
//   const [selectedPlanned, setSelectedPlanned] = useState(row.planned || '');
//   const [selectedRequestorGroup, setSelectedRequestorGroup] = useState(row.requestorGroup || '');
//   const [selectedFinalDecision, setSelectedFinalDecision] = useState(row.decision || '');
//   const [selectedRequestorName, setSelectedRequestorName] = useState(row.productmanagername || '');

//   const [, drop] = useDrop({
//     accept: ItemType,
//     hover: (item, monitor) => {
//       if (!ref.current) {
//         return;
//       }
//       const dragIndex = item.index;
//       const hoverIndex = index;
//       if (dragIndex === hoverIndex) {
//         return;
//       }
//       const hoverBoundingRect = ref.current?.getBoundingClientRect();
//       const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
//       const clientOffset = monitor.getClientOffset();
//       const hoverClientY = clientOffset.y - hoverBoundingRect.top;
//       if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//         return;
//       }
//       if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//         return;
//       }
//       moveRow(dragIndex, hoverIndex);
//       item.index = hoverIndex;
//     },
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { type: ItemType, index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   drag(drop(ref));

//   const handleStatusChange = (value, groupIndex) => {
//     setSelectedStatus((prev) => ({
//       ...prev,
//       [groupIndex]: value,
//     }));
//   };

//   const handlePriorityChange = (event) => {
//     setSelectedPriority(event.target.value);
//   };

//   const handlePlannedChange = (event) => {
//     setSelectedPlanned(event.target.value);
//   };

//   const handleRequestorGroupChange = (event) => {
//     setSelectedRequestorGroup(event.target.value);
//   };

//   const handleFinalDecisionChange = (event) => {
//     setSelectedFinalDecision(event.target.value);
//   };

//   const handleRequestorNameChange = (event) => {
//     setSelectedRequestorName(event.target.value);
//   };

//   const getFinalDecisionBackgroundColor = (decision) => {
//     switch (decision) {
//       case 'inQ':
//         return '#b7cab8';
//       case 'notInQ':
//         return '#d4c0bd';
//       default:
//         return 'transparent';
//     }
//   };

//   return (
//     <TableRow
//       ref={ref}
//       style={{ 
//         opacity: isDragging ? 0.5 : 1,
//         cursor: isDragging ? "url('/waving-hand-cursor.png'), auto" : "grab" 
//       }}
//       key={index}
//       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//     >
//       <TableCell>
//         <Select
//           value={selectedRequestorGroup}
//           onChange={handleRequestorGroupChange}
//           displayEmpty
//         >
//           {group.map((groupOption, groupIndex) => (
//             <MenuItem value={groupOption} key={groupIndex}>
//               {groupOption}
//             </MenuItem>
//           ))}
//         </Select>
//       </TableCell>
//       <TableCell>
//         <Select
//           value={selectedRequestorName}
//           onChange={handleRequestorNameChange}
//           displayEmpty
//         >
//           {requestorNames.map((nameOption, nameIndex) => (
//             <MenuItem value={nameOption} key={nameIndex}>
//               {nameOption}
//             </MenuItem>
//           ))}
//         </Select>
//       </TableCell>
//       <TableCell>{row.title}</TableCell>
//       <TableCell align="right">
//         <Select
//           value={selectedPlanned}
//           onChange={handlePlannedChange}
//           displayEmpty
//         >
//           {quarterDates.map((dateOption, dateIndex) => (
//             <MenuItem value={dateOption} key={dateIndex}>
//               {dateOption}
//             </MenuItem>
//           ))}
//         </Select>
//       </TableCell>
//       <TableCell>{row.description}</TableCell>
//       <TableCell>
//         <Select
//           value={selectedPriority}
//           onChange={handlePriorityChange}
//           displayEmpty
//         >
//           {priorityOptions.map((priorityOption, priorityIndex) => (
//             <MenuItem value={priorityOption} key={priorityIndex}>
//               {priorityOption}
//             </MenuItem>
//           ))}
//         </Select>
//       </TableCell>
//       <TableCell>
//         <Select
//           value={selectedFinalDecision}
//           onChange={handleFinalDecisionChange}
//           displayEmpty
//           style={{ backgroundColor: getFinalDecisionBackgroundColor(selectedFinalDecision), padding: '0.2em' }}
//           MenuProps={{
//             PaperProps: {
//               style: {
//                 backgroundColor: getFinalDecisionBackgroundColor(selectedFinalDecision),
//               }
//             }
//           }}
//         >
//           {finalDecision.map((decisionOption, decisionIndex) => (
//             <MenuItem value={decisionOption} key={decisionIndex}>
//               {decisionOption}
//             </MenuItem>
//           ))}
//         </Select>
//       </TableCell>
//       {showGroups && group.map((item, groupIndex) => (
//         <TableCell align="right" key={groupIndex}>
//           <Select
//             value={selectedStatus[groupIndex]?.statusname || 'Pending Response'}
//             onChange={(e) => handleStatusChange(e.target.value, groupIndex)}
//             displayEmpty
//             renderValue={(selected) => selected || 'Pending Response'}
//           >
//             {status.map((statusOption, statusIndex) => (
//               <MenuItem value={statusOption} key={statusIndex}>
//                 {statusOption}
//               </MenuItem>
//             ))}
//           </Select>
//         </TableCell>
//       ))}
//       <TableCell align="right">{row.comment}</TableCell>
//       <TableCell align="right"><a href={row.jiralink}>Jira Link</a></TableCell>
//     </TableRow>
//   );
// };

// const BasicTable = () => {
//   const { group, setGroup } = useGroupContext();
//   const [showGroups, setShowGroups] = useState(false);
//   const [rows, setRows] = useState([]);
//   const [filteredRows, setFilteredRows] = useState([]);
//   const [finalDecision, setFinalDecision] = useState([]);
//   const [quarterDates, setQuarterDates] = useState([]);
//   const [requestorNames, setRequestorNames] = useState([]);
//   const [priorityOptions, setPriorityOptions] = useState([]);
//   const [descriptions, setDescriptions] = useState([]);
//   const [status, setStatus] = useState([]);
//   const [filterRequestorGroup, setFilterRequestorGroup] = useState([]);
//   const [filterRequestorName, setFilterRequestorName] = useState([]);
//   const [filterInvolvedName, setFilterInvolvedName] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const groupData = await getGroup();
//         setGroup(groupData);

//         const finalDecisionData = await getFinalDecision();
//         setFinalDecision(finalDecisionData);

//         const quarterDatesData = await getQuarterDates();
//         setQuarterDates(quarterDatesData);

//         const requestorNamesData = await getRequestorNames();
//         setRequestorNames(requestorNamesData);

//         const statusData = await getAllStatus();
//         setStatus(statusData);

//         const descriptionsData = await getDescriptions();
//         setDescriptions(descriptionsData);
//         setRows(descriptionsData);
//         setFilteredRows(descriptionsData);

//         const priorityData = await getPriority();
//         setPriorityOptions(priorityData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [setGroup]);

//   const toggleGroups = () => {
//     setShowGroups(!showGroups);
//   };

//   const moveRow = (dragIndex, hoverIndex) => {
//     const dragRow = rows[dragIndex];
//     const newRows = [...rows];
//     newRows.splice(dragIndex, 1);
//     newRows.splice(hoverIndex, 0, dragRow);
//     setRows(newRows);
//     setFilteredRows(newRows);
//   };

//   const handleFilterChange = () => {
//     let newFilteredRows = rows;
//     if (filterRequestorGroup.length > 0) {
//       newFilteredRows = newFilteredRows.filter(row => filterRequestorGroup.includes(row.requestorGroup));
//     }
//     if (filterRequestorName.length > 0) {
//       newFilteredRows = newFilteredRows.filter(row => filterRequestorName.includes(row.productmanagername));
//     }
//     setFilteredRows(newFilteredRows);
//   };

//   useEffect(() => {
//     handleFilterChange();
//   }, [filterRequestorGroup, filterRequestorName]);

//   const showModal = () => {
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       <AppBar position="static" style={{backgroundColor: '#00C2FF'}}>
//         <Toolbar>
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             Dependencies Planner PRD
//           </Typography>
//           <Button 
//             variant="contained" 
//             color="primary"
//             startIcon={<AddCircleOutlineIcon />}
//             style={{ backgroundColor: '#58D64D', marginRight: '10px' }}
//             onClick={showModal}
//           >
//             Add Request
//           </Button>
//           <MyModal /> 
//           <IconButton onClick={toggleGroups} color="inherit">
//             {showGroups ? <VisibilityOffIcon /> : <VisibilityIcon />}
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//       <div className="container">
//         <div className="sidebar">
//           <List>
//             <ListItem>
//               <FormControl fullWidth>
//                 <InputLabel id="filter-requestor-group-label">Filter by Requestor Group</InputLabel>
//                 <Select
//                   multiple
//                   value={filterRequestorGroup}
//                   label="Filter by Requestor Group"
//                   onChange={(e) => setFilterRequestorGroup(e.target.value)}
//                   displayEmpty
//                   renderValue={(selected) => selected.join(', ')}
//                 >
//                   {group.map((groupOption, groupIndex) => (
//                     <MenuItem value={groupOption} key={groupIndex}>
//                       <Checkbox checked={filterRequestorGroup.indexOf(groupOption) > -1} />
//                       <ListItemText primary={groupOption} />
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </ListItem>
//             <ListItem>
//               <FormControl fullWidth>
//                 <InputLabel id="filter-requestor-name-label">Filter by Requestor Name</InputLabel>
//                 <Select
//                   multiple
//                   value={filterRequestorName}
//                   label="Filter by Requestor Name"
//                   onChange={(e) => setFilterRequestorName(e.target.value)}
//                   displayEmpty
//                   renderValue={(selected) => selected.join(', ')}
//                 >
//                   {requestorNames.map((nameOption, nameIndex) => (
//                     <MenuItem value={nameOption} key={nameIndex}>
//                       <Checkbox checked={filterRequestorName.indexOf(nameOption) > -1} />
//                       <ListItemText primary={nameOption} />
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </ListItem>
//             <ListItem>
//               <FormControl fullWidth>
//                 <InputLabel id="filter-involved-name-label"><div>Filter by Involved Group</div></InputLabel>
//                 <Select
//                   multiple
//                   value={filterInvolvedName}
//                   label="Filter by Involved Group"
//                   onChange={(e) => setFilterInvolvedName(e.target.value)}
//                   displayEmpty
//                   renderValue={(selected) => selected.join(', ')}
//                 >
//                   {group.map((groupOption, groupIndex) => (
//                     <MenuItem value={groupOption} key={groupIndex}>
//                       <Checkbox checked={filterInvolvedName.indexOf(groupOption) > -1} />
//                       <ListItemText primary={groupOption} />
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </ListItem>
//           </List>
//         </div>
//         <div className="table-wrapper">
//           <Card sx={{ minWidth: 275 }}>
//             <CardContent>
//               <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell className="highlight-header">
//                         <div className='columnName'>Requestor Group</div><ExpandCircleDownIcon className="table-header-icon" />
//                       </TableCell>
//                       <TableCell className="highlight-header">
//                         <div className='columnName'>Requestor Name</div><ExpandCircleDownIcon className="table-header-icon" />
//                       </TableCell>
//                       <TableCell className="highlight-header">
//                         <div className='columnName'>Title</div><FormatAlignLeftIcon className="table-header-icon" />
//                       </TableCell>
//                       <TableCell className="highlight-header">
//                         <div className='columnName'>Planned</div><FormatAlignLeftIcon className="table-header-icon" />
//                       </TableCell>
//                       <TableCell className="highlight-header">
//                         <div className='columnName'>Description</div><FormatAlignLeftIcon className="table-header-icon" />
//                       </TableCell>
//                       <TableCell className="highlight-header">
//                         <div className='columnName'>Priority</div><ExpandCircleDownIcon className="table-header-icon" />
//                       </TableCell>
//                       <TableCell className="highlight-header">
//                         <div className='columnName'>Final Decision</div><ExpandCircleDownIcon className="table-header-icon" />
//                       </TableCell>
//                       <TableCell className="highlight-header"><div className='columnName'>
//                         <IconButton onClick={toggleGroups} color="inherit">
//                           {showGroups ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                         </IconButton>
//                       </div></TableCell>
//                       {showGroups && group.map((item, index) => (
//                         <TableCell className="highlight-header" key={index}>
//                           <div className='columnName'>{item}</div><ExpandCircleDownIcon className="table-header-icon" />
//                         </TableCell>
//                       ))}
//                       <TableCell className="highlight-header">
//                         <div className='columnName'>Comments</div><FormatAlignLeftIcon className="table-header-icon" />
//                       </TableCell>
//                       <TableCell className="highlight-header">
//                         <div className='columnName'>Jira Link</div><LinkIcon className="table-header-icon" />
//                       </TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredRows.map((row, index) => {
//                       const finalDecisionBackgroundColor = row.decision === 'inQ' ? '#b7cab8' : row.decision === 'notInQ' ? '#d4c0bd' : 'transparent';

//                       return (
//                         <TableRow
//                           key={index}
//                           style={{ cursor: "grab" }}
//                         >
//                           <TableCell>
//                             <Select
//                               value={row.requestorGroup}
//                               displayEmpty
//                             >
//                               {group.map((groupOption, groupIndex) => (
//                                 <MenuItem value={groupOption} key={groupIndex}>
//                                   {groupOption}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </TableCell>
//                           <TableCell>
//                             <Select
//                               value={row.productmanagername}
//                               displayEmpty
//                             >
//                               {requestorNames.map((nameOption, nameIndex) => (
//                                 <MenuItem value={nameOption} key={nameIndex}>
//                                   {nameOption}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </TableCell>
//                           <TableCell>{row.title}</TableCell>
//                           <TableCell align="right">
//                             <Select
//                               value={row.planned}
//                               displayEmpty
//                             >
//                               {quarterDates.map((dateOption, dateIndex) => (
//                                 <MenuItem value={dateOption} key={dateIndex}>
//                                   {dateOption}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </TableCell>
//                           <TableCell>{row.description}</TableCell>
//                           <TableCell>
//                             <Select
//                               value={row.critical}
//                               displayEmpty
//                             >
//                               {priorityOptions.map((priorityOption, priorityIndex) => (
//                                 <MenuItem value={priorityOption} key={priorityIndex}>
//                                   {priorityOption}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </TableCell>
//                           <TableCell>
//                             <Select
//                               value={row.decision}
//                               displayEmpty
//                               style={{ backgroundColor: finalDecisionBackgroundColor, padding: '0.2em' }}
//                               MenuProps={{
//                                 PaperProps: {
//                                   style: {
//                                     backgroundColor: finalDecisionBackgroundColor,
//                                   }
//                                 }
//                               }}
//                             >
//                               {finalDecision.map((decisionOption, decisionIndex) => (
//                                 <MenuItem value={decisionOption} key={decisionIndex}>
//                                   {decisionOption}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </TableCell>
//                           {showGroups && group.map((item, groupIndex) => (
//                             <TableCell align="right" key={groupIndex}>
//                               <Select
//                                 value={row.affectedGroupsList[groupIndex]?.statusname || 'Pending Response'}
//                                 displayEmpty
//                                 renderValue={(selected) => selected || 'Pending Response'}
//                               >
//                                 {status.map((statusOption, statusIndex) => (
//                                   <MenuItem value={statusOption} key={statusIndex}>
//                                     {statusOption}
//                                   </MenuItem>
//                                 ))}
//                               </Select>
//                             </TableCell>
//                           ))}
//                           <TableCell align="right">{row.comment}</TableCell>
//                           <TableCell align="right"><a href={row.jiralink}>Jira Link</a></TableCell>
//                         </TableRow>
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       <MyModal visible={modalVisible} onClose={closeModal} />
//     </DndProvider>
//   );
// };

// export default BasicTable;
