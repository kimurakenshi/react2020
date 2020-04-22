import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from '../About/About';
import Tasks from '../Task/Tasks';
import { APP_ROUTES } from './Router.constants';

const AppRouter = () => (
  <Switch>
    <Route exact path={APP_ROUTES.HOME}>
      <Tasks />
    </Route>
    <Route path={APP_ROUTES.ABOUT}>
      <About />
    </Route>
  </Switch>
);

export default AppRouter;
