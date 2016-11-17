import { combineReducers } from 'redux';

// lib
import { routerReducer } from 'react-router-redux';

// app
import user from './user';
import posts from './posts';
import postForm from './postForm';


export default combineReducers({
  routing: routerReducer,
  user,
  posts,
  postForm
});
