<template>
  <div class="board">
    <div v-for="rowIndex in boardSize" :key="rowIndex - 1">
      <Square
        v-for="colIndex in boardSize"
        :key="(rowIndex - 1) * 100 + (colIndex - 1)"
        :rowIndex="rowIndex - 1"
        :colIndex="colIndex - 1"
        :hasO="boardBools[rowIndex - 1][colIndex - 1].hasO"
        :hasX="boardBools[rowIndex - 1][colIndex - 1].hasX"
        :isLatestMove="boardBools[rowIndex - 1][colIndex - 1].isLatestMove"
        @isClicked="handleSquareClick"
      ></Square>
    </div>
    <!-- Dialog box which shows the result of the game (winner / draw) -->
    <v-dialog v-model="isDialogOpen" max-width="300px">
      <v-card class="setFont" color="deep-orange" dark>
        <v-card-title class="justify-center"
          ><span v-if="winner == 'O' || winner == 'X'"
            >{{ winner }} won the game!</span
          ><span v-else>Draw</span></v-card-title
        >
        <v-card-text v-if="winner != 'O' && winner != 'X'" class="text-center"
          >Please reset the game.
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            color="white"
            text
            @click="isDialogOpen = false"
            outlined
            class="mx-2"
            style="border-width: 2px;"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      boardBools: [], // tell if every square has O or X
      isDialogOpen: false,
    };
  },
  computed: {
    winner() {
      return this.$store.state.winner;
    },
    isResetRequested() {
      return this.$store.state.isResetRequested;
    },
    boardSize() {
      return this.$store.state.boardSize;
    },
  },
  watch: {
    winner(newVal, oldVal) {
      // Show the dialog box only when the game status is set
      // Don't show the box when it's just an initialization of the winner
      if (oldVal == "") {
        this.isDialogOpen = true;
      }
    },
    isResetRequested(newVal, oldVal) {
      if (oldVal == false && newVal == true) {
        // Init UI board
        this.initBoard();

        // Init state board
        this.$store.commit("initBoard");
      }
    },
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
    initBoard() {
      // Empty the board
      this.boardBools = [];

      // Initialize the board for booleans.
      for (let i = 0; i < this.boardSize; i++) {
        this.boardBools.push(
          // Note that by .fill(Object), every Object will be the reference to each other
          // So you need to use .map() to keep them independent
          Array(this.boardSize)
            .fill()
            .map(() => {
              // at first all the squares are empty
              return { hasO: false, hasX: false, isLatestMove: false };
            })
        );
      }
    },
  },
  created() {
    // Note that this process (creation & initialization of the board) can't be put in "mounted",
    // because boardBools[] is required for <template> rendering.
    // Therefore this needs to be done prior to rendering.
    this.initBoard();
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
