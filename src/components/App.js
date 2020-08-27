import React from 'react';
import './App.css';
import Core from 'containers/base/Core';
import { Home, About } from '../pages';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Core />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
