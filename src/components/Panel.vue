<template>
  <v-container class="setFont">
    <p>
      Moves:
      <span class="largeText ml-1">{{ turns }}</span>
    </p>
    <p>
      Turn:
      <span class="largeText ml-1">{{ activePlayer }}</span>
    </p>
    <v-btn class="disableCapsLock ma-1" depressed :color="uniColor" dark>
      <v-icon class="mr-1">mdi-arrow-left-drop-circle</v-icon>One Move Back
    </v-btn>
    <v-btn class="disableCapsLock ma-1" depressed :color="uniColor" dark>
      <v-icon class="mr-1">mdi-reload</v-icon>Resume
    </v-btn>
    <p>Board Size</p>
    <v-slider
      class="mt-5 pt-5"
      v-model="boardSize"
      step="1"
      :max="20"
      :min="3"
      thumb-label="always"
      :color="uniColor"
      :track-color="uniColor"
      :thumb-color="uniColor"
    ></v-slider>
    <p>Chain Length</p>

    <v-slider
      class="mt-5 pt-5"
      v-model="chainLength"
      step="1"
      :max="10"
      :min="3"
      thumb-label="always"
      :color="uniColor"
      :track-color="uniColor"
      :thumb-color="uniColor"
    ></v-slider>
  </v-container>
</template>
<script>
export default {
  name: "Panel",
  data: function() {
    return {
      boardSize: 10,
      chainLength: 5,
      uniColor: "deep-orange",
    };
  },
  computed: {
    turns: function() {
      return this.$store.state.history.length + 1;
    },
    activePlayer: function() {
      return this.$store.state.isOsTurn ? "O" : "X";
    },
  },
};
</script>
<style scoped lang="stylus">
.largeText {
  font-size: 1.4em;
}
</style>
