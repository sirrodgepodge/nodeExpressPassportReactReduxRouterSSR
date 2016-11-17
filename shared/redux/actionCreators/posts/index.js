import * as actionTypes from '../../actionTypes';


export function editPost(post) {
  return {
    type: actionTypes.EDIT_POST,
    post
  };
}

export function addPostRequest(postBody) {
  return {
    type: actionTypes.ADD_POST,
    promise: request => request.post({
      route: '/api/post',
      body: postBody
    })
  };
}

export function updatePostRequest(postForm) {
  const index = postForm.editIndex;
  return {
    type: actionTypes.UPDATE_POST,
    index,
    promise: request => request.put({
      route: `/api/post/${postForm.editId}`,
      body: {
        title: postForm.title,
        body: postForm.body,
        createdDate: new Date()
      }
    })
  };
}

export function deletePostRequest(_id) {
  return {
    type: actionTypes.DELETE_POST,
    _id,
    promise: request => request.delete(`/api/post/${_id}`)
  };
}
