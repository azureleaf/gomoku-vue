<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <Board :boardHeight="boardHeight" :boardWidth="boardWidth"></Board>
  </div>
</template>

<script>
import Board from "./components/Board";

export default {
  name: "App",
  components: {
    Board
  },
  data: function() {
    return {
      title: "Gomoku",
      boardHeight: 20,
      boardWidth: 20
    };
  }
};
</script>

<style lang="stylus"></style>
