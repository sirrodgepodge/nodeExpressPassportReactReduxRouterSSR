// enable ES6 in subsequent files
require('babel-core/register');  // babel registration (runtime transpilation for node)
const path = require('path');
const rootDir = path.resolve(__dirname, '..', '..');

// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true }); // eslint-disable-line

// default NODE_ENV to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// default HOST to 'localhost'
process.env.HOST = process.env.HOST || 'localhost';

// default PORT to 3000
process.env.PORT = process.env.PORT || 3000;

// // default protocol to http
// process.env.HTTPS = process.env.HTTPS || false;

// default APIPORT to 3001
process.env.APIPORT = process.env.APIPORT || process.env.PORT + 1;

// default MongoDB to local
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogCollectionSSR';


// handles live node reloads
if (global.__DEVELOPMENT__) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  })) {
    return;
  }
}

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = process.env.NOSSR;  // <----- CAN DISABLE SERVER SIDE RENDERING FOR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// init app
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../../config/webpack/webpack-isomorphic-tools'))
  .server(rootDir, function serveApp() {
    // require the corresponding environment's init file
    require(`./server`);
  });
