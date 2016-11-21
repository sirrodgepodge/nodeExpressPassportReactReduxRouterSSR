import Express from 'express';
import favicon from 'serve-favicon';
import compression from 'compression';
import helmet from 'helmet';
import path from 'path';

import PrettyError from 'pretty-error';
import http from 'http';

// route handlers
import proxyHandler from './proxy';
import isomorphismHandler from './isomorphism';

// instantiations
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

// middlewares
app.use(helmet()); // add this once other stuff all works
app.use(compression());
app.use(favicon(path.join(__dirname, '..', '..', '..', 'public', 'favicon.ico')));

if(process.env.NODE_ENV === 'production') {
  app.use(Express.static(path.join(__dirname, '..', '..', '..', 'build')));
} else {
  app.use(Express.static(path.join(__dirname, '..', '..', '..', 'public')));
}

// handles proxying to API server for API calls and sockets
proxyHandler(app, server);

// handles SSR
isomorphismHandler(app);

server.listen(process.env.PORT, err => {
  if (err)
    pretty.render(err);

  console.info(`----\n==> ✅  app is running on ${process.env.PORT}, talking to API server on ${process.env.APIPORT}.`);
  console.info(`==> 💻  Open http://${process.env.HOST}:${process.env.PORT} in a browser to view the app.`);
});
