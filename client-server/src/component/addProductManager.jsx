// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   DialogContentText,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Button,
// } from '@mui/material';
// import { addProductManager } from './services'; // Adjust the path to your service file

// const AddProductManager = () => {
//   const [open, setOpen] = useState(false);
//   const [email, setEmail] = useState('');
//   const [productManagerName, setProductManagerName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       await addProductManager(email, productManagerName);
//       setSnackbarMessage('Product manager added successfully!');
//       setSnackbarSeverity('success');
//       setSnackbarOpen(true);
//       handleClose();
//     } catch (error) {
//       setSnackbarMessage('Failed to add product manager. Please try again.');
//       setSnackbarSeverity('error');
//       setSnackbarOpen(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <Button variant="contained" color="primary" onClick={handleClickOpen}>
//         Add Product Manager
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add Product Manager</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Please fill in the details of the new product manager.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Email Address"
//             type="email"
//             fullWidth
//             variant="outlined"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             label="Product Manager Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={productManagerName}
//             onChange={(e) => setProductManagerName(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSubmit} color="primary" disabled={loading}>
//             {loading ? <CircularProgress size={24} /> : 'Add'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default AddProductManager;
import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';
import { addProductManager } from './services'; // Adjust the path to your service file

const AddProductManager = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [productManagerName, setProductManagerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await addProductManager(email, productManagerName);
      setSnackbarMessage('Product manager added successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      setSnackbarMessage('Failed to add product manager. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Product Manager
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product Manager</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the new product manager.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Product Manager Name"
            type="text"
            fullWidth
            variant="outlined"
            value={productManagerName}
            onChange={(e) => setProductManagerName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProductManager;
