import {
  Box,
  Button,
  FormControl,
  Snackbar,
  TextField,
} from '@material-ui/core';
import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  createTask,
  selectHasCreationError,
  getHasCreateTaskError,
} from './taskListSlice';
import { Alert } from '@material-ui/lab';

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
  const hasCreationError = useSelector(selectHasCreationError);
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

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    dispatch(getHasCreateTaskError(false));
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
      <Snackbar open={hasCreationError} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          There was an error while trying to create a task.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateTask;
