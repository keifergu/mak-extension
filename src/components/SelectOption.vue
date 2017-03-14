<template>
    <div v-show="visibility" class="option" :style="pos">
      <mu-icon-button @click="mark" class="mark" icon="book"
        tooltipPosition="top-center" tooltip="标记"/>
      <mu-icon-button @click="showComment" icon="assignment" class="comment"
        tooltipPosition="top-center" tooltip="笔记"/>
    </div>
</template>

<script>

    import { mapState } from 'vuex'
    import Ranger from '../ranger';
    import storage from '../storage';

    let ranger = new Ranger();

    export default {
        name: 'select-option',
        data() {
            return {};
        },
        computed: {
          ...mapState({
            visibility: state => state.option.visibility,

            position: state => state.option.position
          }),

          pos() {
            return {
                top: this.position.top + 28 + "px",
                left: this.position.left + "px"
            };
          }


        },
        methods: {
            showComment() {
              ranger.note();
              let serialize = ranger.serializeHL();
              this.$emit("comment",true, serialize);
              this.$store.commit({
                type: "mark"
              })
            },

            mark() {
              // 先进行高亮，然后才可以对高亮进行序列化操作
              ranger.highlight();
              this.$store.commit({
                type: "mark"
              })
              let serialize = ranger.serializeHL();
              let res = storage.mark.add(serialize, ranger.text(),window.location.href);
              res.then( data => {
                console.log(data.id);
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
