import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from './DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

const DialogContent = withStyles((theme) => ({
  root: {
    overflow: 'scroll',
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function AlertDialog() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="alertDialogTitle"
      open={open}
      style={{ overflowY: 'scroll' }}
    >
      <DialogTitle id="alertDialogTitle" onClose={handleClose}>
        Please note that
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          This site is for demo purposes only, not a real social network.
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
