<template>
  <v-navigation-drawer
    clipped
    app
    touchless
    width="400"
    class="hello"
    v-model="drawer"
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
  data() {
    return {
      drawer: null,
    };
  },
  watch: {
    hide() {
      this.drawer = this.hide;
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