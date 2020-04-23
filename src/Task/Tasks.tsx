import React, { useEffect } from 'react';
import { Page } from '../components';
import { fetchTasks, selectTasks } from './taskListSlice';
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
} from '@material-ui/core';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RestoreIcon from '@material-ui/icons/Restore';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <Page title="Tasks">
      <div className={styles.list}>
        <List>
          {taskList &&
            taskList.map((task, index) => (
              <>
                <ListItem key={task.id}>
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
                      >
                        <CheckCircleIcon />
                      </IconButton>
                    )}
                    {task.isCompleted && (
                      <IconButton
                        edge="end"
                        aria-label="restore"
                        color="primary"
                      >
                        <RestoreIcon />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
                {index < taskList.length - 1 && <Divider component="li" />}
              </>
            ))}
        </List>
      </div>
    </Page>
  );
};

export default Tasks;
