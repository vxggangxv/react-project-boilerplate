import React from 'react';
import './App.scss';
import Core from 'containers/base/Core';
import { HomePage, AboutPage } from 'pages';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Core />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </>
  );
}

export default App;
