import React from 'react';
import { Helmet } from 'react-helmet';

const mapper = {
  brand: {
    title: 'Design Platform',
  },
};
const Page = props => {
  const { children, title, ...otherProps } = props;
  const brandFormat = mapper.brand.title || '';
  const pageName = title || 'React';
  return (
    <>
      <Helmet title={`${brandFormat} — ${pageName}`} />
      <div {...otherProps}>{children}</div>
    </>
  );
};

export default Page;
