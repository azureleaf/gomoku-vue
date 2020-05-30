<template>
  <v-app>
    <v-app-bar app color="deep-orange" dark dense>
      <div class="d-flex align-center">
        <v-icon x-large class="mr-1">mdi-blur</v-icon>
        <v-toolbar-title class="setFont">
          {{ title }}
        </v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/azureleaf/gomoku-vue"
        target="_blank"
        text
      >
        <span class="mr-2 setFont disableCapsLock">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content id="main">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="7">
            <v-card class="d-flex justify-center">
              <v-card-text class="d-flex justify-center">
                <Board></Board>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="3">
            <v-card height="100%">
              <v-card-text>
                <Panel></Panel>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Board from "./components/Board";
import Panel from "./components/Panel";

export default {
  name: "App",
  components: {
    Board,
    Panel,
  },
  data: function() {
    return {
      title: "Gomoku",
    };
  },
  mounted: function() {
    // Initialize the Vuex state
    this.$store.commit("initBoard");
  },
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap');

#main
  background-color: #00cccc;

.setFont
  font-family: 'Fredoka One', cursive !important
.disableCapsLock
  text-transform: none
  letter-spacing: 0
</style>
