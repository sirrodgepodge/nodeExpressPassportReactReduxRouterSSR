import * as actionTypes from '../../actionTypes';
import request from '../../../utils/request';
import { get } from 'lodash';


export function localAuth(user) {
  return {
    type: actionTypes.LOCAL_AUTH,
    user
  };
}

export function logIn(email, password) {
  return dispatch => request.post({
    route: '/auth/login',
    body: {
      email,
      password
    }
  }).then(({ data: user }) =>
    dispatch(localAuth({
      ...user,
      authErrorMessage: null
    }))
  ).catch(res =>
    dispatch(localAuth({
      authErrorMessage: get(res, 'response.body.error')
    }))
  );
}

export function signUp(email, password) {
  return dispatch => request.post({
    route: '/auth/signup',
    body: {
      email,
      password
    }
  }).then(({ data: user }) =>
    dispatch(localAuth({
      ...user,
      authErrorMessage: null
    }))
  ).catch(res =>
    dispatch(localAuth({
      authErrorMessage: get(res, 'response.body.error')
    }))
  );
}

export function addPassword(_id, password) {
  return dispatch => request.post({
    route: '/auth/addPassword',
    body: {
      _id,
      password
    }
  }).then(({ data: user }) =>
    dispatch(localAuth({
      ...user,
      authErrorMessage: null
    }))
  ).catch(res =>
    dispatch(localAuth({
      authErrorMessage: get(res, 'response.body.error')
    }))
  );
}


export function logout() {
  return {
    type: actionTypes.LOG_OUT
  };
}

export function logoutRequest() {
  return dispatch => request.get('/auth/logout')
    .then(() =>
      dispatch(logout()));
}
