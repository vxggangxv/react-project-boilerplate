import React from 'react';
import MainHomeContainer from 'containers/home/MainHomeContainer';
import { PlainTemplate } from 'components/base/template';
import { Header } from 'components/base/header';
import { Page } from 'pages';

function Home(props) {
  return (
    <Page title={'Home'}>
      <PlainTemplate header={<Header />}>
        <MainHomeContainer />
      </PlainTemplate>
    </Page>
  );
}

export default Home;
