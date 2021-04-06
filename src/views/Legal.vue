<template>
  <div class="pa-4 legal" v-html="content" />
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
.legal >>> h1 {
  margin-bottom: 10px;
} 
</style>