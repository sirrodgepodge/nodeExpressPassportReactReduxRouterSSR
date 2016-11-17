import * as actionTypes from '../../actionTypes';


export function logIn(email, password) {
  return {
    type: actionTypes.LOCAL_AUTH,
    promise: request => request.post({
      route: '/auth/login',
      body: {
        email,
        password
      }
    })
  };
}

export function signUp(email, password) {
  return {
    type: actionTypes.LOCAL_AUTH,
    promise: request => request.post({
      route: '/auth/signup',
      body: {
        email,
        password
      }
    })
  };
}

export function addPassword(_id, password) {
  return {
    type: actionTypes.LOCAL_AUTH,
    promise: request => request.post({
      route: '/auth/addPassword',
      body: {
        _id,
        password
      }
    })
  };
}

export function logoutRequest() {
  return {
    type: actionTypes.LOG_OUT,
    promise: request => request.get('auth/logout')
  };
}
