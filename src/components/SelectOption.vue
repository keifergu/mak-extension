<template>
    <div v-show="visibility" class="option" :style="pos">
        <button @click="mark">mark</button>
        <button @click="showComment"
            >comment</button>
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
                top: this.position.top + "px",
                left: this.position.left + "px"
            };
          }


        },
        methods: {
            showComment() {
              ranger.note();
              let serialize = ranger.serializeHL();
              this.$emit("comment",true, serialize);
            },

            mark() {
              // 先进行高亮，然后才可以对高亮进行序列化操作
              ranger.highlight();

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
}
</style>
