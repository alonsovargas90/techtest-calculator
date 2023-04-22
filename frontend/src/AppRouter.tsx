import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { UserProvider } from "./providers/UserContext";
import LoginPage from "./pages/LoginPage";
import NewOperation from "./pages/NewOperation";
import Records from "./pages/Records";
import { LoaderProvider } from "./providers/LoaderContext";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <LoaderProvider>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <ProtectedRoute exact path="/operations" component={NewOperation} />
            <ProtectedRoute exact path="/records" component={Records} />
            <Redirect to="/" />
          </Switch>
        </LoaderProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
