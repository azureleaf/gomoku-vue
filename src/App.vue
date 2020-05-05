<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <Board :boardHeight="boardHeight" :boardWidth="boardWidth"></Board>
    <Panel></Panel>
  </div>
</template>

<script>
import Board from "./components/Board";
import Panel from "./components/Panel";

export default {
  name: "App",
  components: {
    Board,
    Panel
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
