import * as actionTypes from '../../actionTypes';

const initialState = {
  title: '',
  body: '',
  updating: false,
  editIndex: null,
  editId: null
};


export default function postFormReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.EDIT_POST :
      // state is immutable, each change replaces an old object with a new one
      return { ...state, ...action.post };

    case actionTypes.ADD_POST :
      // state is immutable, each change replaces an old object with a new one
      return { ...initialState };

    case actionTypes.UPDATE_POST :
      // state is immutable, each change replaces an old object with a new one
      return { ...initialState }; // clear form;

    default:
      return state;
  }
}
