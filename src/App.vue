<template>
  <v-app>
    <legal-dialog />
    <app-header />
    <template >
      <app-sidebar v-if="acceptedLegal" />
      <v-main>
        <mapbox-map />
        <map-legend v-if="legendLayer" :legendLayer="legendLayer" />
      </v-main>
    </template>
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import LegalDialog from '@/components/legal-dialog'
import MapLegend from '@/components/map-legend'

import { mapState } from 'vuex';

export default {
  name: "App",
  components: {
    MapboxMap: () => import(/* webpackChunkName: "MapboxMap" */ "@/components/mapbox-map"),
    AppSidebar,
    AppHeader,
    LegalDialog,
    MapLegend
  },
  computed: {
    ...mapState({
      acceptedLegal: state => state.acceptedLegal,
      legendLayer: state => state.mapbox.legendLayer
    })
  }
};
</script>

<style>
#app {
  height: 100vh;
}
</style>