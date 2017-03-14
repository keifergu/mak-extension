<template>
    <mu-drawer right :open="visibility" class="comment">
      <mu-appbar title="笔记">
        <mu-icon-button icon="close" slot="left" @click="toggle"/>
      </mu-appbar>
      </mu-appbar>
        <mu-sub-header>所选文本</mu-sub-header>
        <mu-content-block>{{text}}</mu-content-block>
        <mu-divider />
        <mu-sub-header>笔记</mu-sub-header>
        <mu-list v-for="(item, index) in comments" :key="index">
          <mu-list-item :title="item.comment" />
          <mu-divider />
        </mu-list>
        <div @keyup.enter="addComment" >
          <mu-text-field label="笔记" v-model="newComment" class="input" labelFloat/>
          <mu-icon-button icon="send" @click="addComment" class="submit"/>
        </div>
    </mu-drawer>
</template>

<script>
  import { mapState } from 'vuex';
  import * as types from '../store/mutation-types';
  import storage from '../api';

  let Comment = ''
  export default {
    name: 'comment',
    data() {
      return {
        newComment: ''
      }
    },
    computed: {
      ...mapState({
        text: (state) => state.selectText,
        visibility: ({comment}) => comment.visibility,
        serialize: ({comment}) => comment.serialize,
        comments: ({comment}) => comment.comments
      })
    },
    methods: {
      addComment(){
        let _newcomment = this.newComment
        this.newComment = ''
        let commentData = {
          serialize: this.serialize,
          selectText: this.text,
          url: window.location.href,
          comment: _newcomment
        }
        this.$store.dispatch({
          type: 'addComment',
          ...commentData
        })
      },
      toggle(){
        this.$store.commit({
          type: types.CHANGE_COMMENT_STATUS,
          status: false
        })
      }
    }
  }
</script>

<style scoped>
  .comment{
    position: absolute;
    top:0;
    right:0;
    width: 200px;
    height: 100%;
  }
  .submit {
    top: 20px;
    float: left;
    width: 10%;
  }
  .input {
    float: left;
    width: 80%;
  }
</style>
