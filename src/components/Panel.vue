<template>
  <div class="panel">
    <p>{{ turns }}手目です</p>
    <p>{{ activePlayer }}の番です</p>
  </div>
</template>
<script>
export default {
  name: "Panel",
  // data() {
  //   return {
  //     turns: this.$store.state.history.length,
  //     activePlayer: this.$store.state.isOsTurn ? "O" : "X"
  //   };
  // }
  computed: {
    turns: function() {
      return this.$store.state.history.length + 1;
    },
    activePlayer: function() {
      return this.$store.state.isOsTurn ? "O" : "X";
    }
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
