<template>
  <v-navigation-drawer clipped app permanent width="400" class="hello">
    <router-view /> 
  </v-navigation-drawer>
</template>


<style>
/* add this to prevent layout jumping when a scroll bar appears */
.v-navigation-drawer__content {
  overflow-y: scroll;
}
</style>