<template>
  <span class="square">a</span>
</template>

<script>
export default {
  name: "Square",
  props: {
    rowIndex: Number,
    colIndex: Number
  }
};
</script>

<style scoped lang="stylus">
div.square
  height: 20px
  width: 20px
  border: solid 1px black
</style>
