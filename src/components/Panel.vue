<template>
  <div class="panel">
    <p>？手目です</p>
    <p>？の番です</p>
  </div>
</template>
<script>
export default {
  name: "Panel",
  props: {
    boardHeight: Number,
    boardWidth: Number
  },
  data() {
    return {};
  }
};
</script>
<style scoped lang="stylus">
div.board
  display inline-block
  margin 0
  padding 0
  border solid 2px deepskyblue
</style>
