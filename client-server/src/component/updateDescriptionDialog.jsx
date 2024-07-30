// import React, { useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// const UpdateDescriptionDialog = ({ open, onClose, onSave, description }) => {
//   const [newDescription, setNewDescription] = useState(description);

//   const handleSave = () => {
//     onSave(newDescription);
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Update Description</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Please enter the new description.
//         </DialogContentText>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Description"
//           type="text"
//           fullWidth
//           value={newDescription}
//           onChange={(e) => setNewDescription(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSave}>Save</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UpdateDescriptionDialog;
