<template>
  <div class="pa-4 home d-flex flex-column">
    <div>
        <h2 class="h2">Coastal Hazard Wheel App User Agreement</h2>
        <v-divider class="mt-4" />
    </div>
    <div class="legal" v-html="content" />
  </div> 
</template>




<script>
import content from '../content/legal-v2.md'

export default {
  data() {
    return {
      content
    }
  }
}
</script>
<style scoped>
.legal >>> p {
  margin-top: 15px;
} 
.home__content {
  flex: 1;
}
</style>