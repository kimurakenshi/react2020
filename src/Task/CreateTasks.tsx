import { Box, Button, FormControl, TextField } from '@material-ui/core';
import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { createTask } from './taskManagerSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
  },
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  formControl: {
    flex: '1',
    marginRight: theme.spacing(2),
  },
}));

const CreateTask = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const taskNameRef = useRef<HTMLInputElement>();
  const [hasError, setHasError] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const taskInput = taskNameRef.current;

    if (taskInput) {
      if (taskInput.value.trim() === '') {
        setHasError(true);

        return;
      }

      dispatch(createTask(taskInput.value));

      taskInput.value = '';
    }
  };

  return (
    <Box border={1} borderColor="grey.500" className={styles.container}>
      <form
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        className={styles.form}
      >
        <FormControl className={styles.formControl}>
          <TextField
            inputRef={taskNameRef}
            error={hasError}
            label="Name"
            helperText="Please enter a task name"
          />
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    </Box>
  );
};

export default CreateTask;
