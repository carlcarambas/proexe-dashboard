import React, { useEffect } from 'react';
import { Grid, Stack } from '@mui/material';
import { Input } from '../../components/controls';
import { useAppDispatch } from '../../redux/store';
import { useForm, Form } from '../../components/useForm';
import { Button } from '../../components/controls';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  formContainer: {
    minWidth: 700,
    margin: 10,
  },
}));

const initialFValues = {
  id: 0,
  email: '',
  name: '',
};

export default function DashboardForm(props) {
  const dispatch = useAppDispatch();
  const { onUpdate, recordForEdit, setOpenPopup } = props;
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ('name' in fieldValues)
      temp.name = fieldValues.name ? '' : 'Name is required.';

    if ('email' in fieldValues)
      temp.email = fieldValues.email ? '' : 'Email is required.';

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === '');
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(recordForEdit || initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onUpdate(values, resetForm);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    resetForm();
    setOpenPopup(false);
  };

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container className={classes.formContainer}>
        <Grid item xs={12}>
          <Input
            label="Name"
            name="name"
            value={values.name}
            error={errors.name}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            value={values.email}
            error={errors.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid container justifyContent="flex-end" columnSpacing={2}>
          <Stack direction="row" spacing={2}>
            <Button text="Cancel" variant="outlined" onClick={handleCancel} />
            <Button type="submit" variant="contained" text="Submit" />
          </Stack>
        </Grid>
      </Grid>
    </Form>
  );
}
