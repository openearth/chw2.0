<template>
  <div class="pa-4" v-html="content" />
</template>

<script>
import content from '../content/legal.md'

export default {
  data() {
    return {
      content
    }
  }
}
</script>