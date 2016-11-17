import * as actionTypes from '../../actionTypes';


export function initializeUserAndPosts({user, posts}) {
  return {
    type: actionTypes.INITIALIZE_APP,
    user,
    posts
  };
}

export function initializationRequests() {
  return {
    type: actionTypes.INITIALIZE_APP,
    promise: request => Promise.all([
      request.get('/auth/session'),
      request.get('/api/post')
    ])
  };
}
