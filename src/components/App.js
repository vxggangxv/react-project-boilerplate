import React, { Suspense } from 'react';
import Core from 'containers/base/Core';
import { Route, Switch, Redirect } from 'react-router-dom';
import { lazy } from '@loadable/component';
import { baseStyle } from 'styles/base';
import { HomePage, AboutPage, ErrorPage } from 'pages';
import { FullScreenLoading } from 'components/base/loading';

function App() {
  return (
    <>
      <Styled.GlobalStyle />
      <Core />
      <Suspense fallback={<FullScreenLoading />}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/error" component={ErrorPage} />
          <Route component={() => <Redirect to="/error/404" />} />
        </Switch>
      </Suspense>
    </>
  );
}

const Styled = {
  GlobalStyle: baseStyle,
};

export default App;
