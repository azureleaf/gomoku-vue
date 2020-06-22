import Vue from "vue";
import Vuex from "vuex";
import Brain from "../brain";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boardStatus: [], // board with O & X symbols
    boardSize: 10, // assumption: board is square-shaped
    chainLength: 5, // length of the stones necessary to win the game
    isOsTurn: true,
    history: [], // {row: number, col: number, symbol: string}
    brain: "", // place for the instance of COM player algorithm
    nextComMove: "", // {row: number, col: number}
    winner: "",
  },
  mutations: {
    initBoard(state) {
      for (let i = 0; i < state.boardSize; i++) {
        state.boardStatus.push(Array(state.boardSize).fill(""));
      }

      // Instantiate the logic center of the opponent
      this.state.brain = new Brain(
        state.boardStatus,
        state.boardSize,
        state.chainLength
      );
    },
    updateBoardSize(state, payload) {
      state.boardSize = payload.boardSize;
    },
    getNextComMove(state) {
      const { rowIndex, colIndex, winner } = state.brain.getNextMove(
        state.boardStatus
      );

      // Don't set next move when the winner is confirmed / game is a draw
      if (winner || winner === null) {
        console.log("state: game end.");
        state.winner = winner;
      }

      if (rowIndex == null || colIndex == null) {
        console.log("either index is null.");
        return;
      }

      // Winner key isn't necessary to store in the state
      state.nextComMove = { rowIndex, colIndex };
    },
    putStone(state, payload) {
      // When the game is draw or winner is confirmed, abort
      if (state.winner !== "") return;

      // Update only when the square is empty
      if (state.boardStatus[payload.rowIndex][payload.colIndex].length == 0) {
        // Update state board
        const symbol = state.isOsTurn ? "O" : "X";

        state.boardStatus[payload.rowIndex][payload.colIndex] = symbol;

        state.history.push({
          row: payload.rowIndex,
          col: payload.colIndex,
          symbol: symbol,
        });

        // Update player turn
        state.isOsTurn = !state.isOsTurn;
      }
    },
  },
  actions: {
    moveCom({ commit, state }) {
      commit("getNextComMove");
      commit("putStone", state.nextComMove);
    },
  },
  modules: {},
});
