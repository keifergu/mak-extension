<template>
    <div v-show="visibility" class="option" :style="position">
        <button @click="mark">mark</button>
        <button @click="showComment"
            >comment</button>
    </div>
</template>

<script>

    import Ranger from '../ranger';
    import storage from '../storage';

    let ranger = new Ranger();

    export default {
        name: 'select-option',
        data() {
            return {
                visibility: false,
                pos: {
                    top: 0,
                    left: 0
                }
            };
        },
        mounted() {
            this.$on("visibility", function(status, position) {
                this.visibility = status;
                this.pos = status ? position : {};
            })
        },
        computed: {
            position() {
                return {
                    top: this.pos.top + "px",
                    left: this.pos.left + "px"
                };
            }
        },
        methods: {
            showComment() {
              this.$emit("comment",true);
            },

            mark() {
              let res = storage.mark.add(ranger.serializeHL, ranger.text(),window.location.href);
              res.then((data) => {
                console.log(data.id);
              })
              ranger.highlight();
            }
        }
    }
</script>

<style scoped>
.option {
  position: absolute;
}
</style>
