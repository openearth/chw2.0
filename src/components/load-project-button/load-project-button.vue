<template>
  <div class="load-project-button">
    <v-btn icon @click="onFileInput">
      <v-icon>mdi-folder-open</v-icon>
    </v-btn>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <input
          class="load-project-button__input-file"
          type="file"
          accept="application/json"
          v-bind="attrs"
          v-on="on"
          @change="onFileInput"
        >
      </template>
      <span>Open classification point</span>
    </v-tooltip>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      showSnackBar: true
    }
  },
  methods: {
    ...mapActions(['loadProject']),
    onFileInput(event) {
      const destination = 'coastal-classification'
      const params = { wizard: false }

      this.$router.push({ name: destination, params  })
        .catch(() => {})

      this.loadProject(event)

      event.target.value = ''
    }
  }
}
</script>

<style>
.load-project-button {
  position: relative;
  display: flex;
}

.load-project-button .md-button {
  flex: 1;
  z-index: 0;
}

.load-project-button__input-file {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
}
</style>
