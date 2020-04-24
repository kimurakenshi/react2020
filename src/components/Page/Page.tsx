import React, { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  NotificationType,
  resetPageNotification,
  selectError,
  selectIsFetching,
  selectNotification,
} from './pageSlice';
import {
  CircularProgress,
  Container,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

interface PageProps {
  children: ReactNode;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100% - 88px)', // 100% - TopAppBar Height - Padding
    textAlign: 'center',
  },
}));

const Page = ({ children, title }: PageProps) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);
  const notification = useSelector(selectNotification);

  const handleNotificationClose = (
    event?: React.SyntheticEvent,
    reason?: string
  ) => {
    dispatch(resetPageNotification());
  };

  if (isFetching) {
    return (
      <div className={styles.loading}>
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" className={styles.title}>
        {title}
      </Typography>

      {children}

      {notification && (
        <Snackbar
          open={!!notification}
          onClose={handleNotificationClose}
          autoHideDuration={
            notification.type !== NotificationType.ERROR ? 3000 : null
          }
        >
          <Alert onClose={handleNotificationClose} severity={notification.type}>
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </Container>
  );
};

export default Page;
