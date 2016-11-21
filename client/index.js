import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import withScroll from 'scroll-behavior';

// React's library for handling direct DOM interaction (vs. Virual DOM interaction),
// render alows us to place our React app into the DOM
import { render } from 'react-dom';

// bring in app internals
import getRoutes from '../shared/routes';
import Request from '../shared/utils/Request';
import { configureStore } from '../shared/redux/store';

// syncs scroll with routing history
const _browserHistory = withScroll(browserHistory);

// create SimpleIsoFetch instance
const client = new Request();

// If we ever wanted to do server-side rendering, the intial state would get passed to the front end by passing
// the server-side store to the "__INITIAL_STATE__" client-side global variable via a script tag and "hydrating"
// our client-side state with it here
// const store = configureStore(window.__INITIAL_STATE__ || { user: null, posts: []});
const store = configureStore(_browserHistory, client, window.__INITIAL_STATE__);

// attaches routing to state
const history = syncHistoryWithStore(_browserHistory, store);

const Root = (
  <Router
    history={history}
    render={props =>
      <ReduxAsyncConnect
        {...props}
        helpers={{ client }}
        filter={item => !item.deferred}
      />}
  >
    {getRoutes(store)}
  </Router>
);

const rootElement = document.getElementById('root');

// Include DevTools if not in production
if (process.env.NODE_ENV !== 'production' && !window.devToolsExtension) {
  const { DevTools } = require('../shared/redux/DevTools');
  render((
    <Provider store={store}>
      <div>
        {Root}
        <DevTools />
      </div>
    </Provider>
  ), rootElement);
} else {
  render((
    <Provider store={store}>
      {Root}
    </Provider>
  ), rootElement);
}
