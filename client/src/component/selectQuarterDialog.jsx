// import React, { useState } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// const SelectQuarterDialog = ({ open, onClose, onSubmit }) => {
//   const currentYear = new Date().getFullYear();
//   const [year, setYear] = useState(currentYear);
//   const [quarter, setQuarter] = useState('Q1');

//   const handleYearChange = (event) => {
//     setYear(event.target.value);
//   };

//   const handleQuarterChange = (event) => {
//     setQuarter(event.target.value);
//   };

//   const handleSubmit = () => {
//     onSubmit(year, quarter);
//     onClose();
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add Current Quarter</DialogTitle>
//       <DialogContent>
//         <FormControl fullWidth margin="normal">
//           <InputLabel id="year-select-label">Year</InputLabel>
//           <Select
//             labelId="year-select-label"
//             value={year}
//             onChange={handleYearChange}
//           >
//             {[currentYear, currentYear + 1, currentYear +9].map((yr) => (
//               <MenuItem key={yr} value={yr}>
//                 {yr}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl fullWidth margin="normal">
//           <InputLabel id="quarter-select-label">Quarter</InputLabel>
//           <Select
//             labelId="quarter-select-label"
//             value={quarter}
//             onChange={handleQuarterChange}
//           >
//             {['Q1', 'Q2', 'Q3', 'Q4'].map((qtr) => (
//               <MenuItem key={qtr} value={qtr}>
//                 {qtr}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Submit
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default SelectQuarterDialog;
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
} from '@mui/material';

const SelectQuarterDialog = ({ open, onClose, onSubmit }) => {
  const currentYear = new Date().getFullYear();

  // State variables for managing the inputs
  const [year, setYear] = useState(currentYear.toString());
  const [quarter, setQuarter] = useState('Q1');
  const [isCurrent, setIsCurrent] = useState(false);

  // Handle changes in the year input field
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Handle changes in the quarter dropdown
  const handleQuarterChange = (event) => {
    setQuarter(event.target.value);
  };

  // Handle changes in the isCurrent dropdown
  const handleIsCurrentChange = (event) => {
    setIsCurrent(event.target.value === 'true'); // Convert string to boolean
  };

  // Validate the year input
  const isValidYear = (year) => {
    return /^\d{4}$/.test(year) && year >= 1900 && year <= 2100; // Ensure it's a valid 4-digit year
  };

  // Handle the form submission
  const handleSubmit = () => {
    if (!isValidYear(year)) {
      alert('Please enter a valid 4-digit year.');
      return;
    }
    onSubmit(year, quarter, isCurrent);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Current Quarter</DialogTitle>
      <DialogContent>
        {/* Year input field */}
        <TextField
          fullWidth
          margin="normal"
          label="Year"
          value={year}
          onChange={handleYearChange}
          error={!isValidYear(year)}
          helperText={!isValidYear(year) ? "Enter a valid 4-digit year" : ""}
        />

        {/* Quarter dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="quarter-select-label">Quarter</InputLabel>
          <Select
            labelId="quarter-select-label"
            value={quarter}
            onChange={handleQuarterChange}
          >
            {['Q1', 'Q2', 'Q3', 'Q4'].map((qtr) => (
              <MenuItem key={qtr} value={qtr}>
                {qtr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Is Current dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="is-current-select-label">Is Current Queue?</InputLabel>
          <Select
            labelId="is-current-select-label"
            value={isCurrent.toString()}
            onChange={handleIsCurrentChange}
          >
            <MenuItem value="true">yes</MenuItem>
            <MenuItem value="false">no</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectQuarterDialog;
