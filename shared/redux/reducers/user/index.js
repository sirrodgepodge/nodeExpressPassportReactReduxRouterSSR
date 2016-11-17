import { get } from 'lodash';
import {
  INITIALIZE_APP,
  LOCAL_AUTH,
  LOG_OUT
} from '../../actionTypes';

const initialState = null;


export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${INITIALIZE_APP}_SUCCESS` :
      const [{ data: user }] = action.response;
      return user || null;

    case `${LOCAL_AUTH}_SUCCESS` :
      const { data: userFromLogin } = action.response;
      return { ...state, authErrorMessage: null, ...userFromLogin };

    case `${LOCAL_AUTH}_FAIL` :
      const authErrorMessage = get(action.response, 'response.body.error')
      return { ...state, authErrorMessage };

    case LOG_OUT : // being optimistic!
      return null;

    default:
      return state;
  }
}
