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
    colIndex: Number,
  },
  data() {
    return {
      content: "",
      hasO: false,
      hasX: false,
    };
  },
  methods: {
    handleSquareClick: function() {
      // Do nothing when the clicked square already has a symbol
      if (
        this.$store.state.boardStatus[this.rowIndex][this.colIndex].length == 0
      ) {
        // Update the state
        this.$store.commit("putStone", {
          rowIndex: this.rowIndex,
          colIndex: this.colIndex,
        });

        // Update UI
        if (this.$store.state.boardStatus[this.rowIndex][this.colIndex] == "O")
          this.hasO = true;
        else if (
          this.$store.state.boardStatus[this.rowIndex][this.colIndex] == "X"
        )
          this.hasX = true;
      }
    },
  },
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
  border: solid 1px #00cccc;
}
</style>
