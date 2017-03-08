<template>
    <div v-show="visibility" class="comment">
        <div>{{text}}</div>
        <input type="text" name="newComment">
        <input type="submit" name="submit" @click="addComment">
    </div>
</template>

<script>
import AV from "leancloud-storage";
const appId = '2y7v8BdJxedXm5a5sNBji5Aj-gzGzoHsz';
const appKey = 'heXMkHNlopCuUXWzYPpnjcRw';
AV.init({ appId, appKey });
var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
  words: 'Hello'
}).then(function(object) {
  alert('LeanCloud Rocks!');
})
export default {
  name: 'comment',
  data() {
    return {
      visibility: false,
      text: "",
      comments: []
    };
  },
  mounted() {
    this.$on("visibility",(status) => {
      this.visibility = status;
    });
    this.$on("text",(text) => {
      this.text = text;
    });
  },
  methods: {
    addComment(){

    }
  }
}
</script>

<style scope>
.comment{
  position: absolute;
  width: 150px;
  height: 100%;
  background-color: pink;
}
</style>
