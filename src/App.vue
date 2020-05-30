<template>
  <v-app>
    <v-app-bar app color="primary" dark dense>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <v-toolbar-title>{{ title }}</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn href="https://github.com/azureleaf/gomoku-vue" target="_blank" text>
        <span class="mr-2">GitHub</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
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

<style lang="stylus"></style>
