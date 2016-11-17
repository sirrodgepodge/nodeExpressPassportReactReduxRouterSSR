import {
  EDIT_POST,
  ADD_POST,
  UPDATE_POST,
} from '../../actionTypes';

const initialState = {
  title: '',
  body: '',
  updating: false,
  editIndex: null,
  editId: null
};


export default function postFormReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_POST:
      // state is immutable, each change replaces an old object with a new one
      return { ...state, ...action.post };

    case `${ADD_POST}_SUCCESS`:
      // state is immutable, each change replaces an old object with a new one
      return { ...initialState };

    case `${UPDATE_POST}_SUCCESS`:
      // state is immutable, each change replaces an old object with a new one
      return { ...initialState }; // clear form;

    default:
      return state;
  }
}
