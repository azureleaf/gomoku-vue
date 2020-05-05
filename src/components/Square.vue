<template>
  <span class="square" @click="handleSquareClick()" :style="squareStyle">
    {{ content }}
  </span>
</template>

<script>
export default {
  name: "Square",
  props: {
    rowIndex: Number,
    colIndex: Number,
    nextPlayer: String
  },
  data() {
    return {
      content: " ",
      squareStyle: "color: red;"
    };
  },
  methods: {
    handleSquareClick: function() {
      this.$emit("detectSquareUpdate", {
        row: this.rowIndex,
        col: this.colIndex,
        content: this.nextPlayer
      });
      this.content = this.nextPlayer;
    }
  }
};
</script>

<style scoped lang="stylus">
span.square {
  display: inline-block;
  font-family: 'Noto Sans CJK JP', sans-serif;
  height: 20px;
  width: 20px;
  padding: 5px;
  margin: auto;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border: solid 1px deepskyblue;
}
</style>
