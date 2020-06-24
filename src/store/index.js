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
    winner: "", // "O", "X", "null" when a draw game, "" when not settled yet
    isResetRequested: false,
  },
  mutations: {
    // Note that new board size must be set as the state value before this init
    initBoard(state) {
      // Init board
      for (let i = 0; i < state.boardSize; i++) {
        state.boardStatus.push(Array(state.boardSize).fill(""));
      }

      // Instantiate the logic center of the opponent
      this.state.brain = new Brain(
        state.boardStatus,
        state.boardSize,
        state.chainLength
      );

      // Clear other states
      state.nextComMove = "";
      state.winner = "";
      state.isOsTurn = true;
      state.history = [];
      state.isResetRequested = false;
    },
    updateBoardSize(state, payload) {
      console.log("state: got new board size", payload.boardSize);
      state.boardSize = payload.boardSize;

      // Here needs to init the state

      // Here needs to clear the UI
      // Don't forget to turn off this flag later when the reset is done
      state.isResetRequested = true;
    },
    getNextComMove(state) {
      let { rowIndex, colIndex, winner } = state.brain.getNextMove(
        state.boardStatus
      );

      // Don't set next move when the winner is confirmed / game is a draw
      if (winner || winner === null) {
        console.log("state: game result is confirmed.");
        state.winner = winner;

        // When the winner is O, prevent the following X move
        if (winner == "O") {
          rowIndex = null;
          colIndex = null;
        }
      }

      // Winner key isn't necessary to store in the state
      state.nextComMove = { rowIndex, colIndex };
    },
    putStone(state, payload) {
      if (payload.rowIndex == null || payload.colIndex == null) {
        return;
      }

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
