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
    <v-row>
      <v-col cols="12" md="6" class="px-1">
        <v-btn
          class="disableCapsLock ma-1"
          depressed
          :color="uniColor"
          block
          dark
        >
          <v-icon class="mr-1">mdi-arrow-left-drop-circle</v-icon>Back
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" class="px-1">
        <v-btn
          class="disableCapsLock ma-1"
          depressed
          :color="uniColor"
          block
          dark
        >
          <v-icon class="mr-1">mdi-reload</v-icon>Reset
        </v-btn>
      </v-col>
    </v-row>
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
      ticks="always"
      tick-size="4"
    ></v-slider>
    <p>Chain Length</p>

    <v-slider
      class="mt-5 pt-5"
      v-model="chainLength"
      step="1"
      :max="7"
      :min="3"
      thumb-label="always"
      :color="uniColor"
      :track-color="uniColor"
      :thumb-color="uniColor"
      ticks="always"
      tick-size="4"
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

// slider ticks: override the internal Vuetify class
::v-deep .v-slider__tick--filled, ::v-deep .v-slider__tick {
  background-color: #ff5722 !important;
  border-radius: 2px !important;
}
</style>
