<template>
  <div class="pa-4" id="references" v-html="content" ref="references"  />
</template>

<script>
import content from '../content/references.md'

export default {
  data() {
    return {
      content
    }
  },
  mounted () {
    console.log('reference', this.$refs.references)
  }
}
</script>