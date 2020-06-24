<template>
  <v-container class="setFont">
    <!-- Dialog box to confirm the game reset -->
    <v-dialog v-model="isDialogOpen" max-width="300px">
      <v-card class="setFont" color="deep-orange" dark>
        <v-card-title class="justify-center">Reset the game?</v-card-title>
        <v-card-text class="text-center">
          New Board Size: {{ this.boardSize }}
        </v-card-text>
        <v-spacer></v-spacer>
        <v-card-actions class="justify-center">
          <v-btn
            color="white"
            text
            @click="isDialogOpen = false"
            outlined
            class="mx-2"
            style="border-width: 2px;"
          >
            Cancel
          </v-btn>
          <v-btn
            color="white"
            text
            @click="handleGameResetBtn"
            outlined
            class="mx-2"
            style="border-width: 2px;"
          >
            Reset
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <p>
      Moves:
      <span class="largeText ml-1">{{ turns }}</span>
    </p>
    <p>
      Turn:
      <span class="largeText ml-1">{{ activePlayer }}</span>
    </p>
    <v-row>
      <v-col cols="12" class="px-1">
        <v-btn
          class="disableCapsLock ma-1"
          depressed
          :color="uniColor"
          block
          dark
          @click="isDialogOpen = true"
        >
          <v-icon class="mr-1">mdi-reload</v-icon>Reset
        </v-btn>
      </v-col>
    </v-row>
    <p>
      Board Size
    </p>
    <v-slider
      class="mt-6 pt-5"
      v-model="boardSize"
      step="1"
      :max="boardSizeLimit.max"
      :min="boardSizeLimit.min"
      thumb-label="always"
      :color="uniColor"
      :track-color="uniColor"
      :thumb-color="uniColor"
      ticks="always"
      tick-size="5"
      @change="updateChainLengthLimits()"
    ></v-slider>
    <v-snackbar v-model="isSnackbarOpen" :timeout="10000" color="grey darken-3">
      To apply changes, please reset the game!
      <v-btn color="deep-orange" text @click="isSnackbarOpen = false">
        OK
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  name: "Panel",
  data() {
    return {
      boardSize: null,
      chainLength: 5,
      uniColor: "deep-orange",
      boardSizeLimit: { max: 20, min: 5 },
      isDialogOpen: false,
    };
  },
  computed: {
    turns() {
      return this.$store.state.history.length + 1;
    },
    activePlayer() {
      return this.$store.state.isOsTurn ? "O" : "X";
    },
  },
  methods: {
    // Keep the chain length equal to or shorter than the board length
    updateChainLengthLimits() {
      this.isDialogOpen = true;
    },
    handleGameResetBtn() {
      this.isDialogOpen = false;
      this.$store.commit("updateBoardSize", { boardSize: this.boardSize });
    },
  },
  mounted() {
    this.boardSize = this.$store.state.boardSize;
  },
};
</script>
<style scoped lang="stylus">
.largeText {
  font-size: 1.4em;
}

.inselectableText {
  user-select: none;
}

// slider ticks: override the internal Vuetify class
::v-deep .v-slider__tick--filled, ::v-deep .v-slider__tick {
  background-color: #ff5722 !important;
  border-radius: 4px !important;
}
</style>
