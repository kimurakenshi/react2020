import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectError, selectIsFetching } from './pageSlice';
import { CircularProgress, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface PageProps {
  children: ReactNode;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
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
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);

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
    </Container>
  );
};

export default Page;
