import React from 'react';
import {IndexRoute, Route} from 'react-router';

// utility function
import authedRoute from './lib/authedRoute';

// actual app components
import App from './App';
import Blog from './Blog';
import Profile from './Profile';
import NotFound from './NotFound';

export default store => (
  <Route path='/' component={App}>
    { /* Unauthed routes */ }
    <IndexRoute component={Blog}/>

    { /* Routes requiring login */ }
    <Route onEnter={authedRoute(store)}>
      <Route
        path='profile'
        component={Profile}
      />
    </Route>

    { /* Catch all route */ }
    <Route
      path='*'
      component={NotFound}
      status={404}
    />
  </Route>
);
