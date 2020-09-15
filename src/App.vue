<template>
  <v-app>
    <mapbox-map />
  </v-app>
</template>

<script>
import MapboxMap from '@/components/mapbox-map'

export default {
  components: {
    MapboxMap
  },
  name: 'App',
};
</script>
