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
        <Route exact path={`${process.env.PUBLIC_URL}/about`}>
          <About/>
        </Route>
        <Route exact path={`${process.env.PUBLIC_URL}/`}>
          <Dashboard/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
