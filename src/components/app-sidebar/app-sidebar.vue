<template>
  <v-navigation-drawer
    clipped
    app
    touchless
    disable-resize-watcher
    width="400"
    :value="hide"
    :mobile-breakpoint="0"
  >
    <router-view />
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    hide: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
<style>
/* add this to prevent layout jumping when a scroll bar appears */
.v-navigation-drawer__content {
  overflow-y: auto;
}
</style>