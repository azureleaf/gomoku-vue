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
      width: 10
    },
    // Board with scores for every square
    boardEvaluation: {
      // Scores for player O
      o: [],
      // Scores for player X
      x: []
    },
    chainLength: 5,
    isOsTurn: true,
    // Array of objects: row, col, symbol
    history: [],
    brain: ""
  },
  mutations: {
    initBoard(state) {
      for (let i = 0; i < state.boardSize.height; i++) {
        state.boardStatus.push(Array(state.boardSize.width).fill(""));
        state.boardEvaluation.o.push(Array(state.boardSize.width).fill(0));
        state.boardEvaluation.x.push(Array(state.boardSize.width).fill(0));
      }

      // Instantiate the logic center of the opponent
      this.state.brain = new Brain(
        state.boardStatus,
        state.boardSize,
        state.chainLength,
        state.history
      );

      // Set matching templates
      state.brain.setPatterns();
    },
    updateStatus(state, payload) {
      state.boardStatus[payload.row][payload.col] = payload.symbol;
      state.history.push({
        row: payload.row,
        col: payload.col,
        symbol: payload.symbol
      });
    },
    updateBoardSize(state, payload) {
      [state.boardSize.height, state.boardSize.width] = [
        payload.height,
        payload.width
      ];
    },
    updateTurn(state) {
      state.isOsTurn = state.isOsTurn == true ? false : true;
    },
    moveBrain(state) {
      console.log("called");
    }
  },
  actions: {},
  modules: {}
});
