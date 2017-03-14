import * as types from './mutation-types'
import api from '../api'

export const addMark = ({commit}, mark) => {
  commit(types.CHANGE_OPTION_STATUS, false)
  api.mark.add(mark)
  .then((data) => {
    commit(types.ADD_MARK_SUCCESS)
  })
  .catch(err => {
    commit(types.ADD_MARK_FAILURE)
  })
}

export const showComment = ({commit, state}, note) => {
  commit(types.NEW_NOTE,note);
  api.comment.get(note)
  .then(data => {
    let comments = data.map(item => item.attributes);
    commit(types.FETCH_COMMENTS_SUCCESSS,{comments})
  })
}

export const addComment = ({commit, state}, comment) => {
  commit(types.ADD_COMMENT,comment)
  api.comment.add(comment)
  .then(data => {
    commit(types.ADD_COMMENT_SUCCESS,comment)
  })
  .catch(err => {
    commit(types.ADD_COMMENT_FAILURE,comment)
  })
}
