import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainLayout from './modules/layouts/Main';

const App = () => (
  <div className="App">
    <Router>
      <Switch>
        <Route
          path="/main"
          render={(pr) => <MainLayout {...pr} />}
        />
        <Redirect to="/main/home" />
      </Switch>
    </Router>
  </div>
);

export default App;
