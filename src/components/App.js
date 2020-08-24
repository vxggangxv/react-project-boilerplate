import React from 'react';
import Core from 'containers/base/Core';
import { Home } from '../pages';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Core />
      <Switch>
        <Route path="/" component={Home} />
      </Switch>

    </div>
  );
}

export default App;
