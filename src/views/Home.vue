<template>
  <div class="home">
    <mapbox-map />
  </div>
</template>

<script>
import MapboxMap from '@/components/mapbox-map'

export default {
  components: {
    MapboxMap
  }
}
</script>

<style>
.home {
  height: 100%;
}
</style>
