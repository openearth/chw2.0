<template>
  <v-app>
    <app-header />
    <app-sidebar />
    <data-layers />
    <v-main>
      <mapbox-map />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import MapboxMap from "@/components/mapbox-map";
import DataLayers from "@/components/data-layers";

export default {
  components: {
    MapboxMap,
    AppSidebar,
    AppHeader,
    DataLayers,
  },
  name: "App",
};
</script>

<style>
#app {
  height: 100vh;
}
</style>