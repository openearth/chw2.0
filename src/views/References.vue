<template>
  <div class="pa-4 references" v-html="content" ref="references"  />
</template>

<script>
import content from '../content/references.md'

export default {
  data() {
    return {
      content
    }
  },
}
</script>
<style scoped>
.references >>> h1 {
  margin-bottom: 10px;
} 
</style>