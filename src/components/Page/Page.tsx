import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectError, selectIsFetching } from './pageSlice';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface PageProps {
  children: ReactNode;
}

const useStyles = makeStyles(() => ({
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

const Page = ({ children }: PageProps) => {
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
        <p>{error}</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Page;
