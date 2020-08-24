import React from 'react';
import { Home } from '../pages';
import { Route, Switch } from 'react-router-dom';
import Core from 'containers/base/Core';

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
