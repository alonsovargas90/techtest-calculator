import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserProvider } from './providers/UserContext';
import LoginPage from './pages/LoginPage';
import NewOperation from './pages/NewOperation';
import Records from './pages/Records';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/operation" component={NewOperation} />
          <Route path="/records" component={Records} />
        </Switch>
        </UserProvider>
    </BrowserRouter>
  );
};

export default AppRouter;