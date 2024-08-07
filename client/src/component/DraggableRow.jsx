import React, { useState, useRef, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import StatusSelect from './statusColor';
import './BasicTable.css';
import { Select, MenuItem, Checkbox, ListItemText, List, ListItem, Divider, IconButton, FormControl, InputLabel, Card, CardContent, AppBar, Toolbar, Typography } from '@mui/material';
import DeleteComponent from './deleteReq'

import { updatePriority, updateRequestor, updateRequestorGroup, updateFinalDecision, updateStatus, updatePlanned } from './services'; // Import the update service

import FinalDecisionDialog from './updateFinalDecision';
import UpdateTitleDialog from './UpdateTitleDialog';
import UpdateDescription from './updateDescriptionDialog';
import UpdateComment from './updateComment';
import UpdateJira from './updateJira';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from './Contexts/DataContext';
import EditIcon from '@mui/icons-material/Edit';
import BasicTable from "./table"
const ItemType = 'ROW';
const DraggableRow = ({ row, index, moveRow, showGroups, group, setRows, status, priorityOptions, quarterDates, finalDecision, requestorNames, fetchData }) => {
  const {
    refreshRows
  } = useDataContext();
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
  const [open, setOpen] = useState(false);
  const [openDes, setOpenDes] = useState(false);
  const [openJira, setOpenJira] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowDes, setSelectedRowDes] = useState(null);
  const [selectedRowComment, setSelectedRowComment] = useState(null);
  const [selectedRowJira, setSelectedRowJira] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setSelectedStatus(row.affectedGroupsList);
    setSelectedPriority(row.critical);
    setSelectedPlanned(row.planned);
    setSelectedRequestorGroup(row.requestorGroup);
    setSelectedFinalDecision(row.decision);
    setSelectedRequestorName(row.productmanagername);

  }, [row])

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
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    console.log(isEditing)
  };

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, index, id: row.id }, // Include the id here
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));



  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
    // setIsEditing(!EditIcon);
    fetchData();
  };
  const handleCloseDes = () => {
    setOpenDes(false);
    setSelectedRowDes(null);
    // setIsEditing(!EditIcon);
    fetchData();
  }
  const handleCloseJira = () => {
    setOpenJira(false);
    setSelectedRowJira(null);
    // setIsEditing(!EditIcon);
    fetchData();
  }
  const handleCloseComment = () => {
    setOpenComment(false);
    setSelectedRowComment(null);
    // setIsEditing(!EditIcon);
    fetchData();
  }

  const handlePriorityChange = async (event) => {
    if (isEditing) {

      const newPriority = event.target.value;
      setSelectedPriority(newPriority);
      try {
        await updatePriority(row.id, newPriority);
        console.log('Priority updated successfully');
      } catch (error) {
        console.error('Failed to update the priority:', error);
      }
    }
  };
  const handleOpen = (rowTitle) => {
    if (isEditing) {
      setSelectedRow(rowTitle);
      setOpen(true);
    }
  };
  const handleOpenDes = (row) => {
    if (isEditing) {
      setSelectedRowDes(row);
      setOpenDes(true);
    }
    else {
      alert("press on edit icon");
    }
  };
  const handleOpenJira = (row) => {
    if (isEditing) {
      setSelectedRowJira(row);
      setOpenJira(true);
    }
  };
  const handleOpenComment = (row) => {
    if (isEditing) {
      setSelectedRowComment(row);
      setOpenComment(true);
    }
  };
  // const handleStatusChange = (event, groupIndex) => {
  //   setSelectedStatus((prevStatus) => {
  //     const newStatus = [...prevStatus];
  //     newStatus[groupIndex] = { ...newStatus[groupIndex], statusname: event.target.value };
  //     return newStatus;
  //   });
  // };
  const handleStatusChange = async (requestId, groupName, statusName, event, groupIndex) => {
    console.log({ requestId, groupName, statusName, event, groupIndex })
    setSelectedStatus((prevStatus) => {

      const newStatus = [...prevStatus];
      newStatus[groupIndex] = { ...newStatus[groupIndex], statusname: event.target.value };
      return newStatus;
    });
    // server
    try {
      await updateStatus(requestId, groupName, statusName);
      console.log('Updated Succesfuly');
      refreshRows()
    } catch (error) {
      console.error('failed:', error);
    }
  };
  const handlePllanedChange = async (event) => {
    const newPllaned = event.target.value;
    setSelectedPlanned(newPllaned);
    try {
      await updatePlanned(row.id, newPllaned);
      console.log('Planned updated successfully');
    } catch (error) {
      console.error('Failed to update the planned:', error);
    }
  };

  const handleRequestorGroupChange = async (event) => {
    if (isEditing) {

      const newRequestorGroup = event.target.value;
      setSelectedRequestorGroup(newRequestorGroup);
      try {
        await updateRequestorGroup(row.id, newRequestorGroup);
        console.log('requestor group updated successfully');
      } catch (error) {
        console.error('Failed to update the requestor group:', error);
      }
    }
  };
  const handleFinalDecisionChange = (event) => {
    if (isEditing) {
      const value = event.target.value;
      setSelectedFinalDecision(value);

      if (value === 'inQ') {
        setDialogTitle('Insert Jira Link');
      } else if (value === 'notInQ') {
        setDialogTitle('Insert Comment');
      }
      setDialogOpen(true);
    }
  };

  const handleRequestorNameChange = async (event) => {
    if (isEditing) {

      const newRequestor = event.target.value;
      setSelectedRequestorName(newRequestor);
      try {
        await updateRequestor(row.id, newRequestor);
        console.log('requestor updated successfully');
      } catch (error) {
        console.error('Failed to update the requestor:', error);
      }
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
        // style={{
        //   opacity: isDragging ? 0.5 : 1,
        //   cursor: isDragging ? "url('/waving-hand-cursor.png'), auto" : "grab",
        //   '&:hover': { backgroundColor: '#e23939' }
        sx={{
          // opacity: isDragging ? 0.5 : 1,
          // cursor: isDragging ? 'grabbing' : 'grab',
          '&:hover': { backgroundColor: '#f0f0f0' },
          '&:last-child td, &:last-child th': { border: 0 }
        }}
        key={index}
        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
        <TableCell onDoubleClick={() => handleOpen(row)}>{row.title}</TableCell>
        <TableCell align="right">
          <Select
            value={selectedPlanned}
            onChange={handlePllanedChange}
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
        <TableCell onDoubleClick={() => handleOpenDes(row)}>{row.description}</TableCell>

        {/* <TableCell>{row.description}</TableCell> */}
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
        <TableCell align="right" >show group</TableCell>
        {showGroups && group.map((item, groupIndex) => (
          <TableCell align="right" key={groupIndex}>
            <StatusSelect
              value={selectedStatus[groupIndex]?.statusname || 'Pending Response'}
              onChange={(event) => handleStatusChange(row.id, row.affectedGroupsList[groupIndex].groupname, event.target.value, event, groupIndex,)}
              options={status}
            />
          </TableCell>
        ))}
        <TableCell align="right" onDoubleClick={() => handleOpenComment(row)}>{row.comment}</TableCell>
        <TableCell align="right" onDoubleClick={() => handleOpenJira(row)}><a href={row.jiralink}>Jira Link</a></TableCell>

        <TableCell align="right" id='iconButon'><DeleteComponent id={row.id} fetchData={fetchData} /><EditIcon onClick={handleEditClick} style={{ cursor: 'pointer', color: isEditing ? '#5A00E1' : 'black' }} /></TableCell>

      </TableRow>
      <FinalDecisionDialog
        open={dialogOpen}
        title={dialogTitle}
        value={dialogValue}
        onClose={() => setDialogOpen(false)}
        onChange={setDialogValue}
        onSave={handleDialogSave}
      />
      {selectedRow && (
        <UpdateTitleDialog
          open={open}
          onClose={handleClose}
          rowId={selectedRow.id}
          currentTitle={selectedRow.title}
        />
      )}
      {selectedRowDes && (
        <UpdateDescription
          open={openDes}
          onClose={handleCloseDes}
          rowId={selectedRowDes.id}
          currentDescription={selectedRowDes.description}
        />
      )}
      {selectedRowComment && (
        <UpdateComment
          open={openComment}
          onClose={handleCloseComment}
          rowId={selectedRowComment.id}
          currentComment={selectedRowComment.comment}
        />
      )}
      {selectedRowJira && (
        <UpdateJira
          open={openJira}
          onClose={handleCloseJira}
          rowId={selectedRowJira.id}
          currentJira={selectedRowJira.jiralink}
        />
      )}
    </>
  );
};

export default DraggableRow;
