<template>
  <v-app-bar app color="primary" dark clipped-left>
    <v-toolbar-title class="font-weight-black"
      ><router-link to="/" class="white--text text-decoration-none"
        >Coastal Hazard Wheel App</router-link
      ></v-toolbar-title
    >
    <v-app-bar-nav-icon
      v-if="drawer"
      class="nav-icon"
      @click.stop="drawer = !drawer"
    >
    <v-icon>mdi-arrow-left</v-icon>
    </v-app-bar-nav-icon>
    <v-app-bar-nav-icon
      v-else
      class="nav-icon"
      @click.stop="drawer = !drawer"
    >
    <v-icon>mdi-arrow-right</v-icon>
    </v-app-bar-nav-icon>


    <v-spacer />

    <v-tabs right style="width: auto">
      <v-tab :to="{ name: 'home' }" exact> Introduction </v-tab>
      <v-tab :to="{ name: 'coastal-classification' }">
        Coastal classification
      </v-tab>
      <v-tab :to="{ name: 'mapping' }"> Mapping </v-tab>
    </v-tabs>

    <v-divider inset vertical></v-divider>

    <load-project-button />

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="handleSaveClick" v-bind="attrs" v-on="on">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </template>
      <span>Save classification point</span>
    </v-tooltip>

    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item :to="{ name: 'legal' }">
          <v-list-item-title>Legal</v-list-item-title>
        </v-list-item>
        <v-list-item :to="{ name: 'references' }">
          <v-list-item-title>References</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import LoadProjectButton from "@/components/load-project-button";
import { mapActions } from "vuex";

export default {
  components: {
    LoadProjectButton,
  },
  data() {
    return {
      drawer: true,
    };
  },
  watch: {
    drawer() {
      this.$emit("onHide", this.drawer);
    },
  },
  methods: {
    ...mapActions(["loadProject", "saveProject"]),
    handleSaveClick() {
      this.saveProject();
    },
  },
};
</script>
<style scoped>
.v-toolbar__title {
  font-size: 1.5rem !important;
}
.nav-icon {
  margin-left: 100px;
}
</style>

