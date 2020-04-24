import React, { useEffect, Fragment } from 'react';
import { Page } from '../components';
import { fetchTasks, selectTasks, updateTaskStatus } from './taskManagerSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  Divider,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RestoreIcon from '@material-ui/icons/Restore';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { makeStyles } from '@material-ui/core/styles';
import CreateTask from './CreateTasks';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
  },
  completedTask: {
    textDecoration: 'line-through',
  },
}));

const Tasks = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const taskList = useSelector(selectTasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const updateTaskStatusHandler = (taskId: string, isCompleted: boolean) => {
    dispatch(updateTaskStatus(taskId, isCompleted));
  };

  return (
    <Page title="Tasks">
      <Typography variant="h6">Create Task</Typography>
      <CreateTask />
      {taskList && taskList.length > 0 ? (
        <div className={styles.list}>
          <List>
            {taskList.map((task, index) => (
              <Fragment key={task.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {task.isCompleted ? (
                        <AssignmentTurnedInIcon />
                      ) : (
                        <AssignmentIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    className={task.isCompleted ? styles.completedTask : ''}
                    primary={task.name}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                    {!task.isCompleted && (
                      <IconButton
                        edge="end"
                        aria-label="complete"
                        color="primary"
                        onClick={() => updateTaskStatusHandler(task.id, true)}
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    )}
                    {task.isCompleted && (
                      <IconButton
                        edge="end"
                        aria-label="restore"
                        color="primary"
                        onClick={() => updateTaskStatusHandler(task.id, false)}
                      >
                        <RestoreIcon />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                {index < taskList.length - 1 && <Divider component="li" />}
              </Fragment>
            ))}
          </List>
        </div>
      ) : (
        <Alert variant="filled" severity="info">
          You currently don't have any tasks in your list.
        </Alert>
      )}
    </Page>
  );
};

export default Tasks;
