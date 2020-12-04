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
          <data-table v-if="item.info" :data="item.info" />
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

export default {
  components: {
    CollapsibleCard,
    DataTable,
    DataList,
  },
  props: {
    // data
  },
  data() {
    return {
      activeTab: '',
      data: [
        {
          title: 'Hazards',
          info: [
            {
              title: 'CHW information layers',
              info: {
                'Geological layout': 'Any',
                'Wave exposure': 'Any',
                'Tidal range': 'Any',
                'Flora fauna': 'Any',
                'Sediment balance': 'Any',
                'Storm climate': 'Any',
              },
            },
            {
              title: 'Coastal environment',
              info: {
                code: 'Sample',
                slope: 'Sample',
                'Ecosystem disruption': 'Sample',
                'Gradual inundation': 'Sample',
                'Salt water intrusion': 'Sample',
                Erosion: 'Sample',
                Flooding: 'Sample',
              },
            },
          ],
        },
        {
          title: 'Risk',
          info: [
            {
              title: 'Risk',
              info: {
                'Distance to measurement point': 'Sample',
                Population: 'Sample',
                'Capital stock at closest GAR point': 'Sample',
                'Key roads within 100m of the coast': 'Sample',
              },
            },
          ],
        },
        {
          title: 'Measures',
          info: [
            {
              title: 'Measures for Ecosystem disruption',
              measures: ['Sample1', 'Sample2'],
            },
            {
              title: 'Measures for Gradual inundation',
              measures: ['Sample1', 'Sample2'],
            },
            {
              title: 'Measures for Salt water intrusion',
              measures: ['Sample1', 'Sample2'],
            },
            {
              title: 'Measures for Erosion',
              measures: ['Sample1', 'Sample2'],
            },
            {
              title: 'Measures for Flooding',
              measures: ['Sample1', 'Sample2'],
            },
          ],
        },
      ],
    };
  },
  methods: {
    generateState() {
      return [1];
    },
  },
};
</script>
