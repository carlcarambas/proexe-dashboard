import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  dialogWrapper: {
    padding: 1,
    position: 'absolute',
    top: 1,
  },
  dialogTitle: {
    paddingRight: 1,
  },
}));

export default (props) => {
  const { title, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      onClose={() => setOpenPopup(false)}
      maxWidth="md"
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography
            variant="h6"
            component="div"
            style={{ flexGrow: 1, alignSelf: 'center' }}
          >
            {title}
          </Typography>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
