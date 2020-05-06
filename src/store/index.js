import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    boardStatus: [],
    boardSize: {
      height: 10,
      width: 10
    },
    isOsTurn: true,
    history: []
  },
  mutations: {
    initBoard(state) {
      for (let i = 0; i < state.boardSize.height; i++)
        state.boardStatus.push(Array(state.boardSize.width).fill(""));
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
    }
  },
  actions: {},
  modules: {}
});
