import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';

export function useForm(initialFValues, validateOnChange = false, validate) {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (validateOnChange) validate({ [name]: value });
  };

  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    values,
    errors,
    setValues,
    setErrors,
    handleInputChange,
    resetForm,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root, .MuiGrid-container': {
      width: '98%',
      margin: '1rem',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: 'black',
    },

    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'grey',
    },
  },
}));

const checkKeyDown = (e) => {
  if (e.code === 'Enter') e.preventDefault();
};

export function Form(props) {
  const classes = useStyles();
  const { children, ...other } = props;
  return (
    <form
      className={classes.root}
      onKeyDown={(e) => checkKeyDown(e)}
      autoComplete="off"
      {...other}
    >
      {props.children}
    </form>
  );
}
