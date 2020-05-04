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
    colIndex: Number
  },
  data() {
    return {
      content: " ",
      squareStyle: "color: red;"
    };
  },
  methods: {
    handleSquareClick: function() {
      const symbol = "O";
      this.$emit("detectSquareUpdate", {
        row: this.rowIndex,
        col: this.colIndex,
        content: symbol
      });
      this.content = symbol;
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
