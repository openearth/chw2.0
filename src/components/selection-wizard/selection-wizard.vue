<template>
  <div>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 1" step="1">
        Select first point
      </v-stepper-step>

      <v-stepper-content step="1">
        <p>Select the first point on the [?] side of the coast.</p>

        <v-card>
          <img src="@/assets/step1.png" width="100%" class="d-flex" />
        </v-card>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">Select second point</v-stepper-step>

      <v-stepper-content step="2">
        <p>Select the second point on the [?] side of the coast.</p>

        <v-card>
          <img src="@/assets/step2.png" width="100%" class="d-flex" />
        </v-card>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      coordinates: (state) => state.selection.coordinates,
    }),
    step() {
      return this.coordinates.length + 1;
    },
  },
  watch: {
    step(value) {
      if (value === 3) {
        this.$emit("complete");
      }
    }
  },
};
</script>
