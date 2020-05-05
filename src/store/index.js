import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boardStatus: [],
    boardSize: {
      height: 20,
      width: 10
    },
    isOsTurn: true
  },
  mutations: {
    initBoard(state) {
      for (let i = 0; i < state.boardSize.height; i++)
        state.boardStatus.push(Array(state.boardSize.width).fill(""));
      console.log(state.boardStatus);
    },
    updateStatus(state, row, col, symbol) {
      state.boardStatus[row][col] = symbol;
    },
    updateBoardSize(state, height, width) {
      [state.boardSize.height, state.boardSize.width] = [height, width];
    },
    updateTurn(state) {
      state.isOsTurn = state.isOsTurn == true ? false : true;
    }
  },
  actions: {},
  modules: {}
});
