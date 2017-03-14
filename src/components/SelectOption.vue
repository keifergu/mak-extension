<template>
    <div v-show="visibility" class="option" :style="pos">
      <mu-icon-button @click="mark" class="mark" icon="book"
        tooltipPosition="top-center" tooltip="标记"/>
      <mu-icon-button @click="newComment" icon="assignment" class="comment"
        tooltipPosition="top-center" tooltip="笔记"/>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import Ranger from '../ranger';

    let ranger = new Ranger();

    export default {
        name: 'select-option',
        data() {
            return {};
        },
        computed: {
          ...mapState({
            visibility: ({option}) => option.visibility,
            position: ({option}) => option.position
          }),

          pos() {
            return {
                top: this.position.top + 28 + "px",
                left: this.position.left + "px"
            };
          }
        },
        methods: {
            newComment() {
              ranger.note();
              let serialize = ranger.serializeHL();
              let noteData = {
                text: ranger.text(),
                url: window.location.href
              }
              this.$store.dispatch({
                type: "showComment",
                ...noteData
              })
            },

            mark() {
              // 先进行高亮，然后才可以对高亮进行序列化操作
              ranger.highlight();
              let markData = {
                serialize: ranger.serializeHL(),
                text: ranger.text(),
                url: window.location.href
              }
              this.$store.dispatch({
                type: "addMark",
                ...markData
              })
            }
        }
    }
</script>

<style scoped>
.option {
  position: absolute;
  margin: 0;
  padding: 0;
}
.mark {
  display: block;
  float: left;
}
.comment {
  display: block;
  float: left;
}
</style>
