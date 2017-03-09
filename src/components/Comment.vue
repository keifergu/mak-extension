<template>
    <div v-show="visibility" class="comment">
      <button @click="changeVisibility">x</button>
        <div>{{text}}</div>
        <div v-for="item in comments">
          {{item.comment}}
        </div>
        <input v-model="newComment" @keyup.enter="addComment" style="width: 90%">
        <input type="submit" name="submit" @click="addComment">
    </div>
</template>

<script>
import storage from '../storage';

let Comment = ''
export default {
  name: 'comment',
  data() {
    return {
      visibility: false,
      text: '',
      newComment: '',
      comments: []
    };
  },
  watch: {
    text: function(){
      this.comments = [];
      let result = storage.comment.get(this.text, window.location.href);
      result.then((data) => {
        data.forEach((value) => {
          this.comments.push(value.attributes);
        })
      });
    }
  },
  mounted() {
    this.$on('visibility', (status) => {
      this.visibility = status;
    });
    this.$on('text', (text) => {
      this.text = text;
    });
  },
  methods: {
    addComment(){
      let _newcomment = this.newComment;
      // 乐观更新
      this.comments.push({comment:_newcomment});

      // 清空输入框
      this.newComment = '';
      let res = storage.comment.add(this.text, window.location.href, _newcomment);

      res.then((data) => {
        console.log(data.id)
      }, (error)=>{
        // 保存失败时删除最后的一个comment
        this.comments.pop();
        this.newComment = _newcomment;
        console.error('false'+error.message);
      })
    },
    changeVisibility(){
      this.visibility = !this.visibility;
    }
  }
}
</script>

<style scope>
.comment{
  position: absolute;
  top:0;
  right:0;
  width: 200px;
  height: 100%;
  background-color: pink;
}
</style>
