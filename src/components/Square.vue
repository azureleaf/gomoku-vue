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
      content: ""
    };
  },
  computed: {
    squareStyle() {
      return this.content == "O" ? "color: red;" : "color: green;";
    }
  },
  methods: {
    handleSquareClick: function() {
      // Update only when the square is empty
      if (
        this.$store.state.boardStatus[this.rowIndex][this.colIndex].length == 0
      ) {
        // Update UI
        this.content = this.$store.state.isOsTurn ? "O" : "X";

        // Update state board
        this.$store.commit("updateStatus", {
          row: this.rowIndex,
          col: this.colIndex,
          symbol: this.content
        });

        // Update player in turn
        this.$store.commit("updateTurn");
      }
    }
  }
};
</script>

<style scoped lang="stylus">
span.square
  display inline-block
  font-family 'Noto Sans CJK JP', sans-serif
  height 20px
  width 20px
  padding 5px
  margin auto
  font-weight bold
  text-align center
  vertical-align middle
  border solid 1px deepskyblue
</style>
