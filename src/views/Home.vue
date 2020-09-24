<template>
  <div class="pa-4">
    <h2 class="h2">
      Introduction
    </h2>

    <v-divider class="mt-4 mb-4" />

    <div v-html="content" />

    <div class="d-flex mt-8">
      <v-btn class="primary ml-auto" :to="{ name: 'modelling', params: { wizard: true } }">Get started</v-btn>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import content from "@/content/introduction.md";
import { MAP_CENTER, MAP_ZOOM } from '@/lib/constants';

export default {
  data() {
    return {
      content,
    };
  },
  mounted() {
    if (this.$root.map) {
      this.$root.map.flyTo({
        center: MAP_CENTER,
        zoom: MAP_ZOOM
      });
    }

    this.setCoordinates([])
  },
  methods: {
    ...mapMutations({
      setCoordinates: 'selection/SET_COORDINATES'
    })
  }
};
</script>
