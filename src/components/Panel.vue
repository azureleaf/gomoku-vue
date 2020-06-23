<template>
  <v-container class="setFont">
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
            @click="isDialogOpen = false"
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
      <!-- <v-col cols="12" md="6" class="px-1">
        <v-btn
          class="disableCapsLock ma-1"
          depressed
          :color="uniColor"
          block
          dark
        >
          <v-icon class="mr-1">mdi-arrow-left-drop-circle</v-icon>Back
        </v-btn>
      </v-col> -->
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

    <!-- <p>Chain Length</p> -->

    <!-- <v-slider
      class="mt-5 pt-5"
      v-model="chainLength"
      step="1"
      :max="chainLengthLimit.max"
      :min="chainLengthLimit.min"
      thumb-label="always"
      :color="uniColor"
      :track-color="uniColor"
      :thumb-color="uniColor"
      ticks="always"
      tick-size="5"
      @change="openSnackbar()"
    ></v-slider> -->
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
  data: function () {
    return {
      boardSize: 10,
      chainLength: 5,
      uniColor: "deep-orange",
      chainLengthLimit: { max: 5, min: 3 },
      boardSizeLimit: { max: 20, min: 5 },
      isDialogOpen: false,
      isSnackbarOpen: false,
      hasShownSnackbar: false,
    };
  },
  computed: {
    turns: function () {
      return this.$store.state.history.length + 1;
    },
    activePlayer: function () {
      return this.$store.state.isOsTurn ? "O" : "X";
    },
  },
  methods: {
    // Keep the chain length equal to or shorter than the board length
    updateChainLengthLimits() {
      if (this.boardSize < 5) {
        /**
         * When there's only one selectable value in v-slider,
         * such as "3" chain length in 3x3 board,
         * position of the slider picker remains at the last position,
         * which looks ugly and confusing for users
         * So in that case, put the picker in the leftmost position in advance.
         * And this preprocess needs to be done asynchnously
         */
        Promise.resolve()
          .then(() => {
            // Put the picker to the leftmost edge
            if (this.boardSize == 3) this.chainLength = 3;
          })
          .then(() => {
            this.chainLengthLimit.max = this.boardSize;
            if (this.chainLength > this.boardSize)
              this.chainLength = this.boardSize;
          });
      } else {
        this.chainLengthLimit.max = 5;
      }
      this.openSnackbar();
    },
    openSnackbar() {
      if (this.hasShownSnackbar) return;
      this.hasShownSnackbar = true;
      this.isSnackbarOpen = true;
    },
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
