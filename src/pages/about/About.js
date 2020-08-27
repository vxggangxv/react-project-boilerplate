import React from 'react';
import { PlainTemplate } from 'components/base/template';
import { Header } from 'components/base/header';
import { Page } from 'pages';

function About(props) {
  return (
    <Page title={'About'}>
      <PlainTemplate header={<Header />}>About</PlainTemplate>
    </Page>
  );
}

export default About;
