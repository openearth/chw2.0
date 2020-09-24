<template>
  <div class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">
        Introduction
      </h2>

      <v-divider class="mt-4 mb-4" />
    </div>

    <div class="home__content">
      <div class="home__logos mb-6">
        <img src="@/assets/img/deltares-logo.png" class="mr-8" />
        <img src="@/assets/img/chw-logo.png" />
      </div>
      <div v-html="content" />
    </div>

    <div class="d-flex pt-4">
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

<style>
  .home {
    max-height: 100%;
    overflow: hidden;
  } 
  
  .home__content {
    overflow-y: auto;
    flex: 1;
  }

  .home__logos {
    display: flex;
    height: 3rem;
  }

  .home__logos img {
    height: 100%;
  }
</style>