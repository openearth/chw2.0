<template>
  <v-app>
    <app-header />
    <app-sidebar />
    <v-main>
      <mapbox-map />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import MapboxMap from "@/components/mapbox-map";

export default {
  components: {
    MapboxMap,
    AppSidebar,
    AppHeader,
  },
  name: "App",
};
</script>

<style>
#app {
  height: 100vh;
}
</style>