import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import PrettyError from 'pretty-error';
const pretty = new PrettyError();

// internal app
import Request from '../../../../shared/utils/Request';
import Html from '../../../../shared/Html';
import getRoutes from '../../../../shared/routes';
import { configureStore } from '../../../../shared/redux/store';

// need to set base URL for server-side requests
Request.setBaseUrl(`http://localhost:${process.env.PORT}`);

// sends initial html to client
function hydrateOnClient(store, component) {
  return `<!doctype html> ${
    renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        store={store}
        {...(component && {component} || {})}
      />
    )
  }`;
}

export default app => {
  app.use((req, res) => {
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      webpackIsomorphicTools.refresh();
    }
    const request = new Request(req);
    const memoryHistory = createHistory(req.originalUrl);
    handleRender(configureStore(memoryHistory, request));

    function handleRender(store) {
      // if server-side renderring disabled send to client-side
      if (__DISABLE_SSR__) return res.send(hydrateOnClient(store));

      const history = syncHistoryWithStore(memoryHistory, store); // attach routing to state

      match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
          res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          console.error('ROUTER ERROR: ', pretty.render(error));
          res.status(500);
          res.send(
            hydrateOnClient(store)
          );
        } else if (renderProps) {
          loadOnServer({...renderProps, store, helpers: {client: request}}).then(() => {
            res.status(200);

            res.send(
              hydrateOnClient(store, (
                <Provider store={store} key='provider'>
                  <ReduxAsyncConnect {...renderProps} />
                </Provider>
              ))
            );
          });
        } else {
          res.status(404).send('Not found');
        }
      });
    }
  });
};
