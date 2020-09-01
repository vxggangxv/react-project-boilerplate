import React from 'react';
import MainHomeContainer from 'containers/home/MainHomeContainer';
import { AppTemplate } from 'components/base/template';
import { Header } from 'components/base/header';
import { Page } from 'pages';

function Home(props) {
  return (
    <AppTemplate title={'Page - Home'}>
      <MainHomeContainer />
    </AppTemplate>
  );
}

export default Home;
