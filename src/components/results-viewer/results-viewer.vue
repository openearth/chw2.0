<template>
  <div>
    <v-tabs fixed-tabs v-model="activeTab" class="mb-4">
      <v-tab>Hazard</v-tab>
      <v-tab>Risk</v-tab>
      <v-tab>Measures</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <collapsible-data-card title="Data results" :data="dataResults" />
        <collapsible-data-card
          title="Coastal environment"
          :data="coastalEnvironment"
        />
      </v-tab-item>
      <v-tab-item>
        <collapsible-data-card title="Risk" :data="riskData" />
      </v-tab-item>
      <v-tab-item>
        <collapsible-data-card title="Risk" :data="riskData" />
        <collapsible-data-card title="Measures" :data="measuresData" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import CollapsibleDataCard from '@/components/collapsible-data-card';

export default {
  components: {
    CollapsibleDataCard,
  },
  props: {
    dataResults: {
      type: Object,
      required: true,
    },
    coastalEnvironment: {
      type: Object,
      required: true,
    },
    riskData: {
      type: Object,
      required: true,
    },
    measuresData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeTab: '',
    };
  },
  methods: {
    generateState() {
      return [1];
    },
  },
};
</script>
