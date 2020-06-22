<template>
  <span
    class="square"
    @click="handleSquareClick()"
    :class="{ bgColored: isLatestMove }"
  >
    <SymbolO
      v-if="hasO"
      :isReverse="isReverse"
      :pos="rowIndex + '-' + colIndex"
    ></SymbolO>
    <SymbolX
      v-else-if="hasX"
      :isReverse="isReverse"
      :pos="rowIndex + '-' + colIndex"
    ></SymbolX>
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
    hasO: Boolean,
    hasX: Boolean,
    isLatestMove: Boolean,
  },
  data() {
    return {
      isReverse: false,
    };
  },
  methods: {
    handleSquareClick: function () {
      // Do nothing when the clicked square already has a symbol
      // or the winner is confirmed, or the game is a draw
      if (
        this.$store.state.boardStatus[this.rowIndex][this.colIndex].length ==
          0 &&
        this.$store.state.winner === ""
      ) {
        // Tell the parent component that this square is clicked
        this.$emit("isClicked", this.rowIndex, this.colIndex);
      }
    },
  },
};
</script>

<style scoped lang="stylus">
span.square {
  display: inline-block;
  height: 32px;
  width: 32px;
  padding: 5px;
  margin: auto;
  text-align: center;
  vertical-align: middle;
  border: solid 1px #00cccc;
}

.bgColored {
  background-color: #ffff99;
}
</style>
