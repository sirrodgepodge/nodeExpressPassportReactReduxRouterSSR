import {
  INITIALIZE_APP,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST
} from '../../actionTypes';

const initialState = [];


export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case `${INITIALIZE_APP}_SUCCESS` :
      const [, { data: posts }] = action.response;
      return posts.sort((a,b) => Date.parse(b.createdDate) - Date.parse(a.createdDate));

    case `${ADD_POST}_SUCCESS` :
      const { data: addedPost } = action.response;
      return [addedPost, ...state]; // state is immutable, each change replaces an old object with a new one

    case `${UPDATE_POST}_SUCCESS` :
      const { data: updatedPost } = action.response;
      const newStatePosts = state.slice(); // creating new array (removes pointer to old one)
      newStatePosts[action.index] = updatedPost;
      return newStatePosts; // state is immutable, each change replaces an old object with a new one

    case DELETE_POST : // being optimistic!
      return state.filter(post => post._id !== action._id);

    default:
      return state;
  }
}
