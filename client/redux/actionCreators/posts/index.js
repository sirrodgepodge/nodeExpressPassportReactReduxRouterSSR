import * as actionTypes from '../../actionTypes';
import request from '../../../utils/request';


export function editPost(post) {
  return {
    type: actionTypes.EDIT_POST,
    post
  };
}


export function addPost(post) {
  return {
    type: actionTypes.ADD_POST,
    post
  };
}

export function addPostRequest(postBody) {
  return dispatch => request.post({
    route: '/api/post',
    body: postBody
  }).then(({ data }) => dispatch(addPost(data)));
}


export function updatePost({index, post}) {
  return {
    type: actionTypes.UPDATE_POST,
    index,
    post
  };
}

export function updatePostRequest(postForm) {
  const index = postForm.editIndex;
  return dispatch => request.put({
      route: `/api/post/${postForm.editId}`,
      body: {
        title: postForm.title,
        body: postForm.body,
        createdDate: new Date()
      }
    }).then(({ data }) =>
      dispatch(updatePost({
        index: index,
        post: data
      })));
}


export function deletePost(_id) {
  return {
    type: actionTypes.DELETE_POST,
    _id
  };
}

export function deletePostRequest(_id) {
  return dispatch => request.delete(`/api/post/${_id}`)
    .then(res => dispatch(deletePost(_id)));
}
