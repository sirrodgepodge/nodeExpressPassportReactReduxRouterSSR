import { combineReducers } from 'redux';

// lib
import { routerReducer } from 'react-router-redux';
import { reducer as asyncReducer } from 'redux-connect';

// app
import user from './user';
import posts from './posts';
import postForm from './postForm';


export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect: asyncReducer,
  user,
  posts,
  postForm
});
