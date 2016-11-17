import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';


export function configureStore(history, initialState) {
  let finalCreateStore;

  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  if (process.env.NODE_ENV === 'production') {
    finalCreateStore = applyMiddleware(thunk, reduxRouterMiddleware)(createStore);
  } else {
    const { DevTools } = require('../DevTools');
    finalCreateStore = compose(
      applyMiddleware(thunk, reduxRouterMiddleware),
      DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
