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
  import storage from '../api';

  let Comment = ''
  export default {
    name: 'comment',
    computed: {
      ...mapState({
        text: (state) => state.selectText,
        visibility: ({comment}) => comment.visibility,
        newComment: ({comment}) => comment.newComment,
        serialize: ({comment}) => comment.serialize,
        comments: ({comment}) => comment.comments
      })
    },
    methods: {
      addComment(){
        let _newcomment = this.newComment;
        // 乐观更新
        this.comments.push({comment:_newcomment});

        // 清空输入框
        this.newComment = '';
        let res = storage.comment.add(this.serialize, this.text, window.location.href, _newcomment);

        res.then((data) => {
          console.log(data.id)
        }, (error)=>{
          // 保存失败时删除最后的一个comment
          this.comments.pop();
          this.newComment = _newcomment;
          console.error('false'+error.message);
        })
      },
      toggle(){
        this.visibility = !this.visibility;
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
