<template>
  <v-app>
    <welcome-dialog />
    <app-header />
    <template v-if="acceptedLegal">
      <app-sidebar />
      <v-main>
        <mapbox-map />
      </v-main>
    </template>
  </v-app>
</template>

<script>
import AppHeader from "@/components/app-header";
import AppSidebar from "@/components/app-sidebar";
import MapboxMap from "@/components/mapbox-map";
import WelcomeDialog from '@/components/welcome-dialog'
import { mapState } from 'vuex';

export default {
  name: "App",
  components: {
    MapboxMap,
    AppSidebar,
    AppHeader,
    WelcomeDialog
  },
  computed: {
    ...mapState({
      acceptedLegal: state => state.acceptedLegal
    })
  }
};
</script>

<style>
#app {
  height: 100vh;
}
</style>