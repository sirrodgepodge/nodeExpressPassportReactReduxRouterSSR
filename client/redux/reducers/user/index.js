import * as actionTypes from '../../actionTypes';

const initialState = null;


export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.INITIALIZE_APP :
      return action.user;

    case actionTypes.LOCAL_AUTH :
      return { ...state, ...action.user };

    case actionTypes.LOG_OUT :
      return null;

    default:
      return state;
  }
}
