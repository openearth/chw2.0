<template>
  <v-app>
    <legal-dialog />
    <app-header @onHide="hideNavigation" />
    <template>
      <app-sidebar :hide="drawer" v-if="acceptedLegal" />
      <v-main>
        <mapbox-map />
      </v-main>
    </template>
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import LegalDialog from "@/components/legal-dialog";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    MapboxMap: () =>
      import(/* webpackChunkName: "MapboxMap" */ "@/components/mapbox-map"),
    AppSidebar,
    AppHeader,
    LegalDialog,
  },
  computed: {
    ...mapState({
      acceptedLegal: (state) => state.acceptedLegal,
      legendLayer: (state) => state.mapbox.legendLayer,
    }),
  },
  data() {
    return {
      drawer: true,
    };
  },
  methods: {
    hideNavigation(event) {
      console.log("drawer in app", event);
      this.drawer = event;
    },
  },
};
</script>

<style>
#app {
  height: 100vh;
}
</style>