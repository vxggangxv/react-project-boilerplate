import React from 'react';
import MainHomeContainer from 'containers/home/MainHomeContainer';
import { AppTemplate } from 'components/base/template';

function HomePage(props) {
  return (
    <AppTemplate title={'Home'}>
      <MainHomeContainer />
    </AppTemplate>
  );
}

export default HomePage;
