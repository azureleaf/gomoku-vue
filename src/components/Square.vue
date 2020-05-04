<template>
  <span class="square" @click="log()">{{ content }}</span>
</template>

<script>
export default {
  name: "Square",
  props: {
    rowIndex: Number,
    colIndex: Number
  },
  data() {
    return {
      content: " "
    };
  },
  methods: {
    log: function() {
      console.log(this.rowIndex, this.colIndex, "clicked!");
      this.content = "O";
    }
  }
};
</script>

<style scoped lang="stylus">
span.square
  display inline-block
  height 20px
  width 20px
  padding 5px
  color red
  margin auto
  font-weight bold
  text-align center
  vertical-align middle
  border solid 1px grey
</style>
