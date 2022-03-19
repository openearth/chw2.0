<template>
  <div class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">Introduction</h2>

      <v-divider class="mt-4 mb-4" />
    </div>

    <!--           <a
            href="https://coastalhazardwheel.org"
            rel="noopener noreferrer"
            target="_blank"
            >coastalhazardwheel.org</a
            https://www.deltares.nl/
          > -->

    <div class="home__content">
      <div class="home__logos mb-6 ml-2 ">
        <a href="https://coastalhazardwheel.org" target="_blank">
          <img src="@/assets/img/chw-logo.png" class="chw_logo"  />
        </a>
        <a href="https://www.deltares.nl" target="_blank">
          <img style="max-width:200px;" src="@/assets/img/deltares-logo.png" />
        </a>
      </div>
      <div v-html="content" />
    </div>

    <div class="d-flex pt-4">
      <v-btn
        color="primary"
        dark
        class="ml-auto"
        :to="{ name: 'coastal-classification', params: { wizard: true } }"
        >Get started</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import content from "@/content/introduction.md";
import { MAP_CENTER, MAP_ZOOM } from "@/lib/constants";

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
        zoom: MAP_ZOOM,
      });
    }

    this.setLineCoordinates([]);
    this.setTargetBlank();
  },
  methods: {
    ...mapMutations({
      setLineCoordinates: "selection/SET_LINE_COORDINATES",
    }),
    setTargetBlank() {
      var links = document.links;
      links.forEach((link) => {
        if (link.hostname != window.location.hostname) {
          link.target = "_blank";
        }
      });
    },
  },
};
</script>

<style>
.home {
  height: 100%;
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

.chw_logo {
  max-width: 120px;
  padding-top: 13px;
}

/* .home__logos img {
  height: 100%;
} */
</style>

