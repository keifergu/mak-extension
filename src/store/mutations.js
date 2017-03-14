import * as types from './mutation-types'

export default {
  [types.SELECT_TEXT](state, payload) {
    state.option.visibility = true;
    state.selectText = payload.text;
    state.option.position = payload.position;
  },
  [types.NEW_NOTE](state, note) {
    state.comment.serialize = note.serialize;
    state.comment.visibility = true;
    state.option.visibility = false;
  }
}
