<template>
  <div class="board">
    <div v-for="rowIndex in boardHeight" :key="rowIndex - 1">
      <Square
        v-for="colIndex in boardWidth"
        :key="(rowIndex - 1) * 100 + (colIndex - 1)"
        :rowIndex="rowIndex - 1"
        :colIndex="colIndex - 1"
        @isClicked="handleSquareClick"
        :hasO="boardBools[rowIndex - 1][colIndex - 1].hasO"
        :hasX="boardBools[rowIndex - 1][colIndex - 1].hasX"
      ></Square>
    </div>
  </div>
</template>

<script>
import Square from "./Square";

export default {
  name: "Board",
  components: {
    Square,
  },
  data() {
    return {
      boardHeight: this.$store.state.boardSize.height,
      boardWidth: this.$store.state.boardSize.width,
      boardBools: [], // tell if every square has O or X
    };
  },
  methods: {
    async handleSquareClick(rowIndex, colIndex) {
      // Update board, history, and turn
      await this.$store.commit("putStone", {
        rowIndex: rowIndex,
        colIndex: colIndex,
      });
      // Update UI with props down (human player)
      await this.updateBoardBools(rowIndex, colIndex);

      // Let the COM player move
      // This just update the state, not UI
      this.$store.dispatch("moveCom");

      // Update UI with props down (com player)
      const nextComMove = await this.$store.state.nextComMove;
      this.updateBoardBools(nextComMove.rowIndex, nextComMove.colIndex);
    },
    async updateBoardBools(rowIndex, colIndex) {
      const boardStatus = await this.$store.state.boardStatus;
      this.boardBools[rowIndex][colIndex].hasO =
        boardStatus[rowIndex][colIndex] == "O";
      this.boardBools[rowIndex][colIndex].hasX =
        boardStatus[rowIndex][colIndex] == "X";
    },
  },
  created: function() {
    // Initialize the board for booleans
    // This process can't be put in "mounted",
    // because boardBools[] is required for <template> rendering
    for (let i = 0; i < this.boardHeight; i++) {
      this.boardBools.push(
        // Note that by .fill(Object), every Object will be the reference to each other
        // So you need to use .map() to keep them independent
        Array(this.boardWidth)
          .fill()
          .map(() => {
            // at first all the squares are empty
            return { hasO: false, hasX: false };
          })
      );
    }
  },
};
</script>

<style scoped lang="stylus">
div.board {
  display: inline-block;
  margin: 0;
  padding: 0;
  border: solid 2px #00cccc;
}
</style>
