import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MyProvider } from './MyProvider';
import LoginPage from './pages/LoginPage';
import NewOperation from './pages/NewOperation';
import Records from './pages/Records';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <MyProvider>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/operation" component={NewOperation} />
          <Route path="/records" component={Records} />
        </Switch>
      </MyProvider>
    </BrowserRouter>
  );
};

export default AppRouter;