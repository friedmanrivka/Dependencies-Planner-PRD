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
import { Select, MenuItem } from '@mui/material';

const ItemType = 'ROW';

const DraggableRow = ({ row, index, moveRow, showGroups, group, status }) => {
  const ref = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState(
    Array(group.length).fill('Pending Response')
  );

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

  return (
    <TableRow
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      key={index}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>{row.requestorGroup}</TableCell>
      <TableCell align="right">{row.productmanagername}</TableCell>
      <TableCell>{row.title}</TableCell>
      <TableCell align="right">{row.planned}</TableCell>
      <TableCell>{row.description}</TableCell>
      <TableCell>{row.critical}</TableCell>
      <TableCell>{row.decision}</TableCell>
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
  const [finalDecision, setFinalDecision] = useState([]);
  const [quarterDates, setQuarterDates] = useState([]);
  const [requestorNames, setRequestorNames] = useState([]);
  const [priority, setPriority] = useState([]);
  const [descriptions, setDescriptions] = useState([]);
  const [status, setStatus] = useState([]);

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
        setRows(descriptionsData); // Update the state with the fetched data

        const priorityData = await getPriority();
        setPriority(priorityData);
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
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <Button variant="contained" onClick={toggleGroups}>
          {showGroups ? 'Hide Groups' : 'Show Groups'}
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell className="highlight-header">Requestor Group</TableCell>
                <TableCell className="highlight-header" align="right">Requestor Name</TableCell>
                <TableCell className="highlight-header">Initiative Title</TableCell>
                <TableCell className="highlight-header" align="right">Planned</TableCell>
                <TableCell className="highlight-header">Description</TableCell>
                <TableCell className="highlight-header">Priority</TableCell>
                <TableCell className="highlight-header">Final Decision</TableCell>
                {showGroups && group.map((item, index) => (
                  <TableCell className="highlight-header" align="right" key={index}>
                    {item}
                  </TableCell>
                ))}
                <TableCell className="highlight-header" align="right">Comments</TableCell>
                <TableCell className="highlight-header" align="right">Jira Link</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <DraggableRow
                  key={index}
                  index={index}
                  row={row}
                  moveRow={moveRow}
                  showGroups={showGroups}
                  group={group}
                  status={status}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </DndProvider>
  );
};

export default BasicTable;
