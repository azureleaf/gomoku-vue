<template>
  <div class="board">
    <div v-for="rowIndex in boardHeight" :key="rowIndex - 1">
      <Square
        v-for="colIndex in boardWidth"
        :key="(rowIndex - 1) * 100 + (colIndex - 1)"
        :rowIndex="rowIndex - 1"
        :colIndex="colIndex - 1"
      >
      </Square>
    </div>
  </div>
</template>

<script>
import Square from "./Square";

export default {
  name: "Board",
  components: {
    Square
  },
  data() {
    return {
      boardHeight: this.$store.state.boardSize.height,
      boardWidth: this.$store.state.boardSize.width
    };
  },
  methods: {}
};
</script>

<style scoped lang="stylus">
div.board
  display inline-block
  margin 0
  padding 0
  border solid 2px deepskyblue
</style>
