<template>
  <span class="square" @click="log()"></span>
</template>

<script>
export default {
  name: "Square",
  props: {
    rowIndex: Number,
    colIndex: Number
  },
  methods: {
    log: function() {
      console.log(this.rowIndex, this.colIndex, "clicked!");
    }
  }
};
</script>

<style scoped lang="stylus">
span.square
  display: inline-block
  height: 20px
  width: 20px
  border: solid 1px blue
</style>
