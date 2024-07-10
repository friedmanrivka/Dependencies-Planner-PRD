// src/component/GroupTable.js
import React, { useEffect, useState } from 'react';
import { getGroup } from './services';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const GroupTable = () => {
  const [group, setGroup] = useState([]);

  const fetchGroup = async () => {
    try {
      const data = await getGroup();
      setGroup(data);
    } catch (error) {
      console.error('Error fetching group:', error);
    }
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Group Name</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {group.map((item) => (
            <TableRow key={item.id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupTable;
