import React from 'react';
import AboutContainer from 'containers/about/AboutContainer';
import { AppTemplate } from 'components/base/template';

function AboutPage(props) {
  return (
    <AppTemplate title={'Home'}>
      <AboutContainer />
    </AppTemplate>
  );
}

export default AboutPage;
