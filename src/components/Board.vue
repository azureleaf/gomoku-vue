<template>
  <div class="board">
    <div v-for="rowIndex in boardHeight" :key="rowIndex - 1">
      <Square
        v-for="colIndex in boardWidth"
        :key="(rowIndex - 1) * 100 + (colIndex - 1)"
        :rowIndex="rowIndex - 1"
        :colIndex="colIndex - 1"
        :hasO="boardBools[rowIndex - 1][colIndex - 1].hasO"
        :hasX="boardBools[rowIndex - 1][colIndex - 1].hasX"
        :isLatestMove="boardBools[rowIndex - 1][colIndex - 1].isLatestMove"
        @isClicked="handleSquareClick"
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
      boardHeight: this.$store.state.boardSize,
      boardWidth: this.$store.state.boardSize,
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
      // Update bools of hasO and hasX
      // thereby update UI with props down to the square
      const boardStatus = await this.$store.state.boardStatus;
      const history = await this.$store.state.history;
      this.boardBools[rowIndex][colIndex].hasO =
        boardStatus[rowIndex][colIndex] == "O";
      this.boardBools[rowIndex][colIndex].hasX =
        boardStatus[rowIndex][colIndex] == "X";

      // Add color to the square of the latest move
      this.boardBools[rowIndex][colIndex].isLatestMove = true;

      // Remove color from the square of the 2nd-to-the-latest move
      // Ignore for the 1st move, because no square is colored then
      if (history.length > 1) {
        const rowIndex2 = history[history.length - 2].row;
        const colIndex2 = history[history.length - 2].col;
        this.boardBools[rowIndex2][colIndex2].isLatestMove = false;
      }
    },
  },
  created: function () {
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
            return { hasO: false, hasX: false, isLatestMove: false };
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
  border-radius: 4px;
}
</style>
