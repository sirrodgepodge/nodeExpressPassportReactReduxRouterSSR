import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import asyncMiddleware from './middleware/asyncMiddleware';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';


export function configureStore(history, client, initialState) {
  let finalCreateStore;

  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [asyncMiddleware(client), reduxRouterMiddleware];

  if (process.env.NODE_ENV === 'production' || __SERVER__) {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  } else {
    const { persistState } = require('redux-devtools');
    const { DevTools } = require('../DevTools');
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
