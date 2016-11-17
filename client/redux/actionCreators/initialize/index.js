import * as actionTypes from '../../actionTypes';
import request from '../../../utils/request';


export function initializeUserAndPosts({user, posts}) {
  return {
    type: actionTypes.INITIALIZE_APP,
    user,
    posts
  };
}

export function initializationRequests() {
  return dispatch =>
    // retrieve app initialization data once root component has mounted
    Promise.all([
      request.get('/auth/session'),
      request.get('/api/post')
    ])
    .then(([{ data: user }, { data: posts }]) =>
      dispatch(initializeUserAndPosts({
        user: user || null,
        posts: posts.sort((a,b) => Date.parse(b.createdDate) - Date.parse(a.createdDate)) // sort by date, descending
      })));
}
