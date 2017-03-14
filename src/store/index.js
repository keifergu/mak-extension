const option = {
  state: {
    visibility: false,
    position: {
      top: 0,
      left: 0
    }
  },
  mutations: {
    changeVisibility(state, payload) {
      state.visibility = payload.visibility;
      state.position = payload.position;
    },
    mark(state, payload) {
      state.visibility = false;
    }
  }
}

const comment = {
  state: {
    visibility: false,
    text: '',
    newComment: '',
    serialize: '',
    comments: []
  },
  mutations: {
    changeVisibility(state, payload) {
      state.visibility = payload.visibility;
    },

    changeInput(state, payload) {
      state.newComment = payload.newComment;
    },

    showComment(state, payload) {
      state.visibility = false;
    }
  }
}

export default {
  modules: {
    option,
    comment
  }
}
