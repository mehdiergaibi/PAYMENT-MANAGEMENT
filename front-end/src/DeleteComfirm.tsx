import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteConfirmation({ open, onClose, onConfirm, page }) {

  const handleConfirm = () => {
    onConfirm(); // Call the onConfirm function passed from the parent
    onClose(false); // Close the confirmation dialog
  };

  const handleClose = () => {
    onClose(false); // Close the confirmation dialog without confirming deletion
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Sure to delete {page}?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          By deleting {page} you won't have access to it anymore!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
