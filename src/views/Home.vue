<template>
  <div class="pa-4">
    <h2 class="h2">
      Introduction
    </h2>

    <v-divider class="mt-4 mb-4" />

    <div v-html="content" />

    <div class="d-flex mt-8">
      <v-btn class="primary ml-auto" :to="{ name: 'modelling' }">Get started</v-btn>
    </div>
  </div>
</template>

<script>
import content from "@/content/introduction.md";

export default {
  data() {
    return {
      content,
    };
  },
};
</script>
