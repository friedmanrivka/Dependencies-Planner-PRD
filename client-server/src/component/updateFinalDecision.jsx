// import {updateFinalDecision} from './services'
// const UpdateRquest = ({selectedFinalDecision}) => {
//     console.log("finalDecision"+selectedFinalDecision)
//     const handleUdateFinalDecision = async () => {
//        try{
//         const success = await updateFinalDecision(223,{selectedFinalDecision},'sucsess update final decision');
//         console.log("success"+success);
//    }
//     catch (error) {
//         console.log('Failed to update the request. Please try again.');
//     }
// };
// return (
//     <div>
//        <button onClick={handleUdateFinalDecision}>hhh</button>
//     </div>
// );
// }
// export default UpdateRquest;

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const FinalDecisionDialog = ({ open, title, value, onClose, onChange, onSave }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label={title}
          type="text"
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FinalDecisionDialog;
