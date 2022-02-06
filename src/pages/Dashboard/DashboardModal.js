import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import { Button } from '../../components/controls';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  formContainer: {
    minWidth: 300,
    margin: 10,
  },
}));

function DashboardModal(props) {
  const { onDelete, setOpenPopup, recordForDelete } = props;
  const classes = useStyles();

  const handleCancel = (e) => {
    e.preventDefault();
    setOpenPopup(false);
  };

  return (
    <Grid container className={classes.formContainer}>
      <Grid container justifyContent="flex-end" columnSpacing={2}>
        <Grid container style={{ margin: 30 }}>
          <Stack direction="column" spacing={2}>
            <Typography>Record to Delete: {recordForDelete?.name} </Typography>
            <Typography>Are you sure?</Typography>
          </Stack>
        </Grid>
        <Stack direction="row" spacing={2}>
          <Button text="Cancel" variant="outlined" onClick={handleCancel} />
          <Button
            type="submit"
            variant="contained"
            text="Delete"
            style={{ backgroundColor: 'red' }}
            onClick={onDelete}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default DashboardModal;
