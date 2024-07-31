
import React, { useState, useRef } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import StatusSelect from './statusColor';
import './BasicTable.css';
import { Select, MenuItem, Checkbox, ListItemText, List, ListItem, Divider, IconButton, FormControl, InputLabel, Card, CardContent, AppBar, Toolbar, Typography } from '@mui/material';
import DeleteComponent from './deleteReq'
import { updatePriority, updateRequestor, updateRequestorGroup, updateFinalDecision } from './services'; // Import the update service
import FinalDecisionDialog from './updateFinalDecision';
import UpdateTitleDialog from './UpdateTitleDialog';
const ItemType = 'ROW';
const DraggableRow = ({ row, index, moveRow, showGroups, group,setRows, status, priorityOptions, quarterDates, finalDecision, requestorNames }) => {

  const ref = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState(row.affectedGroupsList || '');
  const [selectedPriority, setSelectedPriority] = useState(row.critical || '');
  const [selectedPlanned, setSelectedPlanned] = useState(row.planned || '');
  const [selectedRequestorGroup, setSelectedRequestorGroup] = useState(row.requestorGroup || '');
  const [selectedFinalDecision, setSelectedFinalDecision] = useState(row.decision || '');
  const [selectedRequestorName, setSelectedRequestorName] = useState(row.productmanagername || '');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogValue, setDialogValue] = useState('');

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
    item: { type: ItemType, index, id: row.id }, // Include the id here
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }); 

  drag(drop(ref));

  const handleStatusChange = (event, groupIndex) => {
    setSelectedStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[groupIndex] = { ...newStatus[groupIndex], statusname: event.target.value };
      return newStatus;
    });
  };





  const handlePriorityChange = async (event) => {
    const newPriority = event.target.value;
    setSelectedPriority(newPriority);
    try {
      await updatePriority(row.id, newPriority);
      console.log('Priority updated successfully');
    } catch (error) {
      console.error('Failed to update the priority:', error);
    }
  };

  const handlePlannedChange = (event) => {
    setSelectedPlanned(event.target.value);
  };

  const handleRequestorGroupChange = async (event) => {
    const newRequestorGroup = event.target.value;
    setSelectedRequestorGroup(newRequestorGroup);
    try {
      await updateRequestorGroup(row.id, newRequestorGroup);
      console.log('requestor group updated successfully');
    } catch (error) {
      console.error('Failed to update the requestor group:', error);
    }
  };

  const handleFinalDecisionChange = (event) => {
    const value = event.target.value;
    setSelectedFinalDecision(value);

    if (value === 'inQ') {
      setDialogTitle('Insert Jira Link');
    } else if (value === 'notInQ') {
      setDialogTitle('Insert Comment');
    }

    setDialogOpen(true);
  };

  const handleRequestorNameChange = async (event) => {
    const newRequestor = event.target.value;
    setSelectedRequestorName(newRequestor);
    try {
      await updateRequestor(row.id, newRequestor);
      console.log('requestor updated successfully');
    } catch (error) {
      console.error('Failed to update the requestor:', error);
    }
  };

  const handleDialogSave = async () => {
    try {
      await updateFinalDecision(row.id, selectedFinalDecision, dialogValue);
      console.log('Final decision updated successfully');
    } catch (error) {
      console.error('Failed to update the final decision:', error);
    } finally {
      setDialogOpen(false);
    }
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
    <>
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
                  backgroundColor: '#d3d3d3',
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
        <TableCell>{row.title}<UpdateTitleDialog id={row.id}newTitle={row.title}></UpdateTitleDialog></TableCell>
        <TableCell align="right">
          <Select
            value={selectedPlanned}
            onChange={handlePlannedChange}
            displayEmpty
            style={{ backgroundColor: '#d3d3d3' }}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#d3d3d3',
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
        <TableCell align="right" key={groupIndex}>
          <StatusSelect
            value={row.affectedGroupsList[groupIndex]?.statusname || 'Pending Response'}
            onChange={(event) => handleStatusChange(event, groupIndex)}
            options={status}
          />
        </TableCell>
))}

        <TableCell align="right">{row.comment}</TableCell>
        <TableCell align="right"><a href={row.jiralink}>Jira Link</a></TableCell>
        <TableCell align="right"><DeleteComponent id={row.id} /></TableCell>
      </TableRow>
      <FinalDecisionDialog
        open={dialogOpen}
        title={dialogTitle}
        value={dialogValue}
        onClose={() => setDialogOpen(false)}
        onChange={setDialogValue}
        onSave={handleDialogSave}
      />
    </>
  );
};

export default DraggableRow;
