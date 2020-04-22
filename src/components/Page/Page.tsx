import React, { ReactNode } from 'react';

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => <div>{children}</div>;

export default Page;
