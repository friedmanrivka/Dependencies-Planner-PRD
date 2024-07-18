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
import './BasicTable.css'; // Import the CSS file for custom styles
import {LinkIcon ,FormatAlignLeftIcon,ExpandCircleDownIcon}from '@mui/icons-material/Link';
import { Select, MenuItem, TextField, Checkbox, ListItemText } from '@mui/material'; // import { Select, MenuItem, TextField, Checkbox, ListItemText, FormControl, InputLabel, Card, CardActions, CardContent } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
const ItemType = 'ROW';

const DraggableRow = ({ row, index, moveRow, showGroups, group, status, priorityOptions, quarterDates, finalDecision, requestorNames }) => {
  const ref = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState(Array(group.length).fill('Pending Response'));
  const [selectedPriority, setSelectedPriority] = useState(row.critical || ''); // HIGHLIGHTED
  const [selectedPlanned, setSelectedPlanned] = useState(row.planned || ''); // HIGHLIGHTED
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

//         >

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
            <MenuItem value={groupOption} key={groupIndex}>
              {groupOption}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell >
        <Select
          value={selectedRequestorName}
          onChange={handleRequestorNameChange}
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
          value={selectedPlanned} // HIGHLIGHTED
          onChange={handlePlannedChange}
          displayEmpty
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
          value={selectedPriority} // HIGHLIGHTED
          onChange={handlePriorityChange}
          displayEmpty
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
            value={selectedStatus[groupIndex] || 'Pending Response'}
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
  const [showGroups, setShowGroups] = useState(true);
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]); // HIGHLIGHTED
  const [finalDecision, setFinalDecision] = useState([]);
  const [quarterDates, setQuarterDates] = useState([]);
  const [requestorNames, setRequestorNames] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [status, setStatus] = useState([]);
  const [filterRequestorGroup, setFilterRequestorGroup] = useState([]); // HIGHLIGHTED
  const [filterRequestorName, setFilterRequestorName] = useState([]); // HIGHLIGHTED
  const [filterInvolvedName, setFilterInvolvedName] = useState([]); // HIGHLIGHTED

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
        setFilteredRows(descriptionsData); // HIGHLIGHTED

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
    setFilteredRows(newRows); // HIGHLIGHTED
  };

  const handleFilterChange = () => {
    let newFilteredRows = rows;
    if (filterRequestorGroup.length > 0) {
      newFilteredRows = newFilteredRows.filter(row => filterRequestorGroup.includes(row.requestorGroup));
    }
    if (filterRequestorName.length > 0) {
      newFilteredRows = newFilteredRows.filter(row => filterRequestorName.includes(row.productmanagername));
    }
    setFilteredRows(newFilteredRows); // HIGHLIGHTED
  };

  useEffect(() => {
    handleFilterChange();
  }, [filterRequestorGroup, filterRequestorName]); // HIGHLIGHTED

  return (
    <DndProvider backend={HTML5Backend}>
      <div class="header">
    <h1>Dependencies Planner PRD</h1>
</div>           
    <div className="container">
        <div className="table-wrapper">
      <div>
        <Button variant="contained" color="primary" onClick={toggleGroups}>
          {showGroups ? 'Hide Groups' : 'Show Groups'}
        </Button>
        <div className="filter-container"> {/* HIGHLIGHTED */}
          <div style={{ marginBottom: '10px' }}> {/* HIGHLIGHTED */}
            <span style={{ marginRight: '20px' }}>Filter by Requestor Group</span> 
            <span>Filter by Requestor Name</span> 
          </div> 
          <FormControl >

          <InputLabel id="demo-simple-select-label">Filter by Requestor Group</InputLabel>
          <Select
            multiple
            value={filterRequestorGroup} // HIGHLIGHTED
            label="Filter by Requestor Group"
            onChange={(e) => setFilterRequestorGroup(e.target.value)} // HIGHLIGHTED
            displayEmpty
            style={{ marginRight: '10px' }}
            renderValue={(selected) => selected.join(', ')} // HIGHLIGHTED
          >

            {group.map((groupOption, groupIndex) => (
              <MenuItem value={groupOption} key={groupIndex}>
                <Checkbox checked={filterRequestorGroup.indexOf(groupOption) > -1} /> {/* HIGHLIGHTED */}
                <ListItemText primary={groupOption} /> {/* HIGHLIGHTED */}
              </MenuItem>
            ))}
          </Select>
          filtur </FormControl>involved
          <Select
            multiple
            value={filterRequestorName} // HIGHLIGHTED
            onChange={(e) => setFilterRequestorName(e.target.value)} // HIGHLIGHTED
            displayEmpty
            renderValue={(selected) => selected.join(', ')} // HIGHLIGHTED
          >

            {requestorNames.map((nameOption, nameIndex) => (
              <MenuItem value={nameOption} key={nameIndex}>
                <Checkbox checked={filterRequestorName.indexOf(nameOption) > -1} /> {/* HIGHLIGHTED */}
                <ListItemText primary={nameOption} /> {/* HIGHLIGHTED */}
              </MenuItem>
            ))}
          </Select>

        </div>

          <FormControl >
<InputLabel id="demo-simple-select-label">Filter by involved Group</InputLabel>
<Select
  multiple
  value={filterRequestorGroup} // HIGHLIGHTED
  label="Filter by Requestor Group"
  onChange={(e) => setFilterInvolvedName(e.target.value)} // HIGHLIGHTED
  displayEmpty
  style={{ marginRight: '10px' }}
  renderValue={(selected) => selected.join(', ')} // HIGHLIGHTED>
  {group.map((groupOption, groupIndex) => (
    <MenuItem value={groupOption} key={groupIndex}>
      console.console.log();
      <Checkbox checked={filterRequestorGroup.indexOf(groupOption) > -1} /> {/* HIGHLIGHTED */}
      <ListItemText primary={groupOption} /> {/* HIGHLIGHTED */}
    </MenuItem>
  ))}
</Select></FormControl>

        <Card sx={{ minWidth: 275 }}>
        <CardContent>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>

                <TableCell className="highlight-header">Requestor Group <ExpandCircleDownIcon /></TableCell>
                <TableCell className="highlight-header" align="right">Requestor Name <ExpandCircleDownIcon /></TableCell>
                <TableCell className="highlight-header">Title<FormatAlignLeftIcon/></TableCell>
                <TableCell className="highlight-header" align="right">Planned <ExpandCircleDownIcon /></TableCell>
                <TableCell className="highlight-header">Description<FormatAlignLeftIcon/></TableCell>
                <TableCell className="highlight-header">Priority <ExpandCircleDownIcon /></TableCell>
                <TableCell className="highlight-header">Final Decision <ExpandCircleDownIcon /></TableCell>

                {showGroups && group.map((item, index) => (
                  <TableCell className="highlight-header" key={index}>
                    {item}
                  </TableCell>
                ))}

                <TableCell className="highlight-header" align="right">Comments<FormatAlignLeftIcon/></TableCell>
                <TableCell className="highlight-header" align="right">Jira Link<LinkIcon/></TableCell>

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
      </div>
      </div>
    </DndProvider>
  );
};

export default BasicTable;
