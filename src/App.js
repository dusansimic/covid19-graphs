import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './Dashboard';
import About from './About';
import pkg from '../package.json';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/about'>
          <About/>
        </Route>
        <Route path='/'>
          <Dashboard/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
