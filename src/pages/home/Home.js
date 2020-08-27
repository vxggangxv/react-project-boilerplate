import React from 'react';
import MainHomeContainer from 'containers/home/MainHomeContainer';
import { Page } from 'pages';

function Home(props) {
  return (
    <Page title={"Home"}>
      <MainHomeContainer />
    </Page>
  );
}

export default Home;