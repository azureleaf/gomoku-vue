<template>
  <span class="square" @click="handleSquareClick()">
    <SymbolO v-if="hasO" :pos="rowIndex + '-' + colIndex"></SymbolO>
    <SymbolX v-else-if="hasX" :pos="rowIndex + '-' + colIndex"></SymbolX>
  </span>
</template>

<script>
import SymbolO from "./SymbolO";
import SymbolX from "./SymbolX";

export default {
  name: "Square",
  components: { SymbolO, SymbolX },
  props: {
    rowIndex: Number,
    colIndex: Number
  },
  data() {
    return {
      content: "",
      hasO: false,
      hasX: false
    };
  },
  methods: {
    handleSquareClick: function() {
      // Update only when the square is empty
      if (
        this.$store.state.boardStatus[this.rowIndex][this.colIndex].length == 0
      ) {
        // Update UI
        // this.content = this.$store.state.isOsTurn ? "O" : "X";
        if (this.$store.state.isOsTurn) this.hasO = true;
        else {
          this.hasX = true;
        }

        // Update state board
        this.$store.commit("updateStatus", {
          row: this.rowIndex,
          col: this.colIndex,
          symbol: this.$store.state.isOsTurn ? "O" : "X"
        });

        // Update player in turn
        this.$store.commit("updateTurn");

        // Move the opponent
        this.$store.commit("moveBrain");
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
  border solid 1px #00cccc
</style>
