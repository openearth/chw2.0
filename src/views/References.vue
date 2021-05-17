<template>
  <div class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">References</h2>
      <v-divider class="mt-4" />
    </div>
    <div class="references" v-html="content" ref="references" />
  </div>
</template>
<script>
import content from "../content/references.md";

export default {
  data() {
    return {
      content,
    };
  },
  mounted() {
    this.setTargetBlank();
  },
  methods: {
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
<style scoped>
.references >>> p {
  margin-top: 15px;
}
.home__content {
  flex: 1;
}
</style>