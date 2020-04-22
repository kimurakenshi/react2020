import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectIsFetching } from './pageSlice';

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  const isFetching = useSelector(selectIsFetching);

  if (isFetching) {
    return <h4>Loading...</h4>;
  }

  return <div>{children}</div>;
};

export default Page;
