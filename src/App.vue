<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <Board></Board>
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
      title: "Gomoku"
    };
  },
  mounted: function() {
    this.$store.commit("initBoard");
  }
};
</script>

<style lang="stylus"></style>
