import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import PrettyError from 'pretty-error';
const pretty = new PrettyError();

// internal
import paths from '../../../config/paths';
import Request from '../../../shared/utils/Request';

// app functions
import getRoutes from '../../../shared/routes';
import createStore from '../../../shared/redux/store';

// need to set base URL
Request.setBaseUrl(`${process.env.HTTPS ? 'https' : 'http'}://${process.env.HOST}:${process.env.PORT}/`);

// sends initial html to client
// function hydrateOnClient(store, component) {
//   return `
//     <!doctype html>
//     <html lang="en">
//       <head>
//         <meta charset="utf-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
//         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
//         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
//         <title>React App</title>
//       </head>
//       <body>
//         <div id="root"></div>
//       </body>
//     </html>
//
//   ${
//     renderToString(
//       <Html
//         assets={webpackIsomorphicTools.assets()}
//         store={store}
//         {...(component && {component} || {})}
//       />
//     )
//   }`;
// }

export default app => {
  app.get('/*', (req, res) => {
    console.log('hitting /*');
    res.render('index.html', {
      dev: process.env.NODE_ENV === 'development',
      SSRhtml: '<div>heyyy</div>'
    });
  })
  // app.use((req, res) => {
  //   const simpleIsoFetch = new SimpleIsoFetch(req);
  //   const memoryHistory = createHistory(req.originalUrl);
  //   handleRender(createStore(memoryHistory, simpleIsoFetch));
  //
  //   function handleRender(store) {
  //     // if server-side renderring disabled send to client-side
  //     if (__DISABLE_SSR__) return res.send(hydrateOnClient(store));
  //
  //     syncBindingsWithStore(simpleIsoFetch, store); // attach api response bindings to state
  //     const history = syncHistoryWithStore(memoryHistory, store); // attach routing to state
  //
  //     match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
  //       if (redirectLocation) {
  //         res.redirect(redirectLocation.pathname + redirectLocation.search);
  //       } else if (error) {
  //         console.error('ROUTER ERROR: ', pretty.render(error));
  //         res.status(500);
  //         res.send(
  //           hydrateOnClient(store)
  //         );
  //       } else if (renderProps) {
  //         loadOnServer({...renderProps, store, helpers: {client: simpleIsoFetch}}).then(() => {
  //           res.status(200);
  //
  //           res.send(
  //             hydrateOnClient(store, (
  //               <Provider store={store} key='provider'>
  //                 <ReduxAsyncConnect {...renderProps} />
  //               </Provider>
  //             ))
  //           );
  //         });
  //       } else {
  //         res.status(404).send('Not found');
  //       }
  //     });
  //   }
  // });
};
