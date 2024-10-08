import React from 'react';
import { Select, MenuItem } from '@mui/material';

const getStatusBackgroundColor = (status) => {
    switch (status) {
        case 'In Q(L)':
        case 'In Q(S)':
        case 'In Q(M)':
        case 'In Q(XL)':
          return '#d3ead3'; 
        // case 'Not in Q (L)':
        //   return '#f8d7da'; 
        case 'Pending Response':
          return '#fff3cd'; 
        case 'Not Required':
          return '#d6d8d9'; 
        // case 'Not in Q (S)':
        // case 'Not in Q (M)':
        // case 'Not in Q (L)':
        // case 'Not in Q (XL)':
        //   return '#d6d8d9';
        default:
          return '#ffcccc';
      }
    };

const StatusSelect = ({ value, onChange, options }) => (
  <Select
    value={value}
    onChange={onChange}
    displayEmpty
    style={{ backgroundColor: getStatusBackgroundColor(value), padding: '0.2em' }}
    MenuProps={{
      PaperProps: {
        style: {
          backgroundColor: getStatusBackgroundColor(value),
        }
      }
    }}
  >
    {options.map((statusOption, statusIndex) => (
      <MenuItem value={statusOption} key={statusIndex}>
        {statusOption}
      </MenuItem>
    ))}
  </Select>
);

export default StatusSelect;
