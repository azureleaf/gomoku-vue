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
  props: {
    boardHeight: Number,
    boardWidth: Number
  },
  data() {
    return {
      boardStatus: []
    };
  },
  mounted() {
    // Init the board status
    for (let i = 0; i < this.boardHeight; i++) {
      let row = [];
      for (let j = 0; j < this.boardWidth; j++) {
        row.push("");
      }
      this.boardStatus.push(row);
    }
  }
};
</script>

<style scoped lang="stylus">
div.board
  display inline-block
  margin 0
  padding 0
  border solid 2px grey
</style>
