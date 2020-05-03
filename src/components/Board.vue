<template>
  <div class="board">
    <div v-for="rowIndex in boardHeight" :key="rowIndex">
      <Square
        v-for="colIndex in boardWidth"
        :key="colIndex"
        :rowIndex="rowIndex"
        :colIndex="colIndex"
      >
      </Square>
    </div>
  </div>
</template>

<script>
import Square from "./Square";

export default {
  name: "Board",
  components: {
    Square
  },
  props: {
    boardHeight: Number,
    boardWidth: Number
  }
};
</script>

<style scoped lang="stylus"></style>
