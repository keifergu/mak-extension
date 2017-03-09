<template>
    <div v-show="visibility" class="option" :style="position">
        <button @click="showComment"
            >==</button>
    </div>
</template>

<script>
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
            }
        }
    }
</script>

<style scoped>
.option {
  position: absolute;
}
</style>
