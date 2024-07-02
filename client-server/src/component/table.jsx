import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  InitiativeTitle,
  RequestorGroup,
  Description,
  Priority,
  FinalDecision,
  Group1,
  Group2,
  Group3,
  Planned,
  comments
) {
  return {
    InitiativeTitle,
    RequestorGroup,
    Description,
    Priority,
    FinalDecision,
    Group1,
    Group2,
    Group3,
    Planned,
    comments
  };
}

const rows = [
  createData('Frozen yoghurt', 'Group A', 'Tasty dessert', 'High', 'Approved', 'Yes', 'No', 'Maybe', 'Q1', 'Delicious'),
  createData('Ice cream sandwich', 'Group B', 'Cold dessert', 'Medium', 'Pending', 'No', 'Yes', 'No', 'Q2', 'Sweet'),
  createData('Eclair', 'Group C', 'Pastry', 'Low', 'Rejected', 'No', 'No', 'Yes', 'Q3', 'Rich flavor'),
  createData('Cupcake', 'Group D', 'Small cake', 'High', 'Approved', 'Yes', 'Yes', 'No', 'Q4', 'Colorful'),
  createData('Gingerbread', 'Group E', 'Spicy cookie', 'Medium', 'Pending', 'Maybe', 'No', 'Yes', 'Q1', 'Seasonal')
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow >
            <TableCell><b>Initiative Title</b></TableCell>
            <TableCell><b>Requestor Group</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Priority</b></TableCell>
            <TableCell><b>Final Decision</b></TableCell>
            <TableCell><b>Group 1</b></TableCell>
            <TableCell><b>Group 2</b></TableCell>
            <TableCell><b>Group 3</b></TableCell>
            <TableCell><b>Planned</b></TableCell>
            <TableCell><b>Comments</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow   key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.InitiativeTitle}
              </TableCell>
              <TableCell>{row.RequestorGroup}</TableCell>
              <TableCell>{row.Description}</TableCell>
              <TableCell>{row.Priority}</TableCell>
              <TableCell>{row.FinalDecision}</TableCell>
              <TableCell>{row.Group1}</TableCell>
              <TableCell>{row.Group2}</TableCell>
              <TableCell>{row.Group3}</TableCell>
              <TableCell>{row.Planned}</TableCell>
              <TableCell>{row.comments}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
