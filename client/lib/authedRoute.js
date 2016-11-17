import { initializationRequests } from '../redux/actionCreators/initialize';

const checkAuth = (replace, cb, store) => () => {
  if (!store.getState().user) {
    // oops, not logged in, so can't be here!
    replace('/');
  }
  cb();
};

export default store => (nextState, replace, cb) => {
  const checkAuthCb = checkAuth(replace, cb, store);
  if (!store.getState().user) { // attempt to load user session if not logged in
    store.dispatch(initializationRequests()).then(checkAuthCb);
  } else {
    checkAuthCb();
  }
};
