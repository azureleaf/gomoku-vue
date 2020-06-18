import Vue from "vue";
import Vuex from "vuex";
import Brain from "../brain";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Board with O & X symbols
    boardStatus: [],
    boardSize: {
      height: 10,
      width: 10,
    },
    // Length of chains required to win the game
    chainLength: 5,
    isOsTurn: true,
    // Array of objects: row, col, symbol
    history: [],
    brain: "", // place for the instance of COM player algorithm
    nextComMove: "",
  },
  // getters: {
  //   getBoardStatus: state => {
  //     return state.boardStatus;
  //   },
  // },
  mutations: {
    initBoard(state) {
      for (let i = 0; i < state.boardSize.height; i++) {
        state.boardStatus.push(Array(state.boardSize.width).fill(""));
      }

      // Instantiate the logic center of the opponent
      this.state.brain = new Brain(
        state.boardStatus,
        state.boardSize,
        state.chainLength
      );

      // Set matching templates
      state.brain.setPatterns();
      console.debug("Patterns to be matched:", state.brain.patterns);
    },
    updateBoardSize(state, payload) {
      [state.boardSize.height, state.boardSize.width] = [
        payload.height,
        payload.width,
      ];
    },
    getNextComMove(state) {
      state.nextComMove = state.brain.getRandomMove(state.boardStatus);
    },
    putStone(state, payload) {
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
