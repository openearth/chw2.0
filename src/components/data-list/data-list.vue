<template>
  <v-list class="pa-0">
    <v-list-item-group>
      <template v-for="(item, index) in data">
        <!-- TODO move href link at json file -->
        <v-list-item :key="item" :tabindex="false" href="https://www.coastalhazardwheel.org/media/1391/catalogue_coastal-hazard-wheel.pdf" target="_blank">
          <v-list-item-content>
            <v-list-item-title>{{ item }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="item" v-if="index !== data.length - 1"/>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  }
}
</script>
