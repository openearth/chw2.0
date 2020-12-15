<template>
  <div>
    <v-stepper v-model="step" vertical>
      <v-stepper-step :complete="step > 2" step="1">
        Select first point
      </v-stepper-step>

      <v-stepper-content step="1">
        <p>
          Please zoom in to your area of interest somewhere on the coast, you
          can do this either by zooming with you mousewheel or by typing in the
          area of interest in the search bar.
        </p>

        <p>
          Set the first point of your transect in see in front of the coast.
        </p>

        <v-card>
          <img src="@/assets/step1.png" width="100%" class="d-flex" />
        </v-card>
      </v-stepper-content>

      <v-stepper-step :complete="step > 3" step="2">Select second point</v-stepper-step>

      <v-stepper-content step="2">
        <p>
          Set the second (and end) point of your transect.
        </p>

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
  data() {
    return {
      zoomCompleted: false,
    };
  },
  computed: {
    ...mapState({
      lineCoordinates: (state) => state.selection.lineCoordinates,
    }),
    step() {
      return this.lineCoordinates.length + 1 
    }
  },
  watch: {
    step(value) {
      if (value === 3) {
        this.$emit("complete")
      }
    }
  },
};
</script>
