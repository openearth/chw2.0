<template>
  <div>
    <v-tabs fixed-tabs v-model="activeTab" class="mb-4">
      <v-tab v-for="tab in data" :key="tab.title">{{ tab.title }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="tab in data" :key="tab.title">
        <collapsible-card
          v-for="item in tab.info"
          :key="item.title"
          :title="item.title"
        >

          <coastal-environment-table v-if="item.info && item.title ==='Coastal environment'" :data="item.info" />
          <data-table v-if="item.info && item.title !== 'Coastal environment'"  :data="item.info" />
          <data-list v-if="item.measures" :data="item.measures" />
        </collapsible-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import CollapsibleCard from '@/components/collapsible-card';
import DataTable from '@/components/data-table';
import DataList from '@/components/data-list';
import CoastalEnvironmentTable from '@/components/coastal-environment-table'

export default {
  components: {
    CollapsibleCard,
    DataTable,
    DataList,
    CoastalEnvironmentTable
  },
  props: {
    data: {
      type: Array,
      required: true
    }
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
