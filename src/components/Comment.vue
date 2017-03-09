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
import AV from 'leancloud-storage';

const appId = '2y7v8BdJxedXm5a5sNBji5Aj-gzGzoHsz';
const appKey = 'heXMkHNlopCuUXWzYPpnjcRw';
AV.init({ appId, appKey });

let Comment = AV.Object.extend('Comments');

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
      let queryUrl = new AV.Query('Comments');
      let queryText = new AV.Query('Comments');
      queryUrl.equalTo('url', window.location.href);
      queryText.equalTo('text', this.text);
      let query = AV.Query.and(queryUrl, queryText);
      query.find().then((data) => {
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
      // 构建数据储存对象
      let comment = new Comment();
      comment.set('url', window.location.href);
      comment.set('text', this.text);
      comment.set('comment', _newcomment);

      // 清空输入框
      this.newComment = '';

      // 保存数据
      comment.save().then((data) => {
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
