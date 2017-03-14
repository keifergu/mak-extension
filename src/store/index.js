import api from '../api'
import * as actions from './actions'
import * as getters from './getters'
import * as types from './mutation-types'
import mutations from './mutations'

const option = {
  state: {
    visibility: false,
    position: {
      top: 0,
      left: 0
    }
  },
  mutations: {
    [types.CHANGE_OPTION_STATUS](state, payload) {
      state.visibility = payload.status;
    },
    [types.ADD_MARK_SUCCESS]() {
      ;
    }
  }
}

const comment = {
  state: {
    visibility: false,
    text: '',
    serialize: '',
    comments: []
  },
  mutations: {
    [types.FETCH_COMMENTS_SUCCESSS](state, payload) {
      state.comments = payload.comments;
    },

    [types.FETCH_COMMENTS_FAILURES](state, payload) {
      // state.newComment = payload.newComment;
    },

    [types.ADD_COMMENT](state, comment) {
      state.comments.push(comment)
    },

    [types.ADD_COMMENT_SUCCESS](state, comment) {
      ;
    },

    [types.ADD_COMMENT_FAILURE](state, comment) {
      state.comments.pop();
    },
  }
}

const state = {
  selectText: ''
}

const store = {
  state,
  getters,
  actions,
  mutations,
  modules: {
    option,
    comment
  }
}

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters').default,
      actions: require('./actions').default,
      mutations: require('./mutations').default
    })
  })
}

export default store
