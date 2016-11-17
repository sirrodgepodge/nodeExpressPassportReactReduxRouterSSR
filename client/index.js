import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import withScroll from 'scroll-behavior';
import { configureStore } from './redux/store';

// React's library for handling direct DOM interaction (vs. Virual DOM interaction),
// render alows us to place our React app into the DOM
import { render } from 'react-dom';

// bring in routes
import getRoutes from './routes';

// styling
import './index.css';

// syncs scroll with routing history
const _browserHistory = withScroll(browserHistory);

// If we ever wanted to do server-side rendering, the intial state would get passed to the front end by passing
// the server-side store to the "__INITIAL_STATE__" client-side global variable via a script tag and "hydrating"
// our client-side state with it here
// const store = configureStore(window.__INITIAL_STATE__ || { user: null, posts: []});
const store = configureStore(_browserHistory);

// attaches routing to state
const history = syncHistoryWithStore(_browserHistory, store);

const Root = (
  <Router
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

// Include DevTools if not in production
if (process.env.NODE_ENV === 'production') {
  render((
    <Provider store={store}>
      {Root}
    </Provider>
  ), document.getElementById('root'));
} else {
  const { DevTools } = require('./redux/DevTools');
  render((
    <Provider store={store}>
      <div>
        {Root}
        <DevTools />
      </div>
    </Provider>
  ), document.getElementById('root'));
}
