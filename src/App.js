import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Dashboard from './Dashboard';
import About from './About';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/about'>
          <About/>
        </Route>
        <Route exact path='/'>
          <Dashboard/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
