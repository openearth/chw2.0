<template>
  <v-expansion-panels v-model="open" class="mb-4">
    <v-expansion-panel>
      <v-expansion-panel-header class="font-weight-bold px-4">{{
        title
      }}</v-expansion-panel-header>
      <v-expansion-panel-content class="mx-n6">
        <slot />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      open: 0,
    };
  },
};
</script>