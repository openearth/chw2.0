<template>
  <v-simple-table>
    <template v-slot:default>
      <thead class="d-sr-only">
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(value, key) in data" :key="key">
          <td class="font-weight-bold">{{ mapPropertyToTitle(key) }}</td>
          <td v-if="value.includes('!')">{{ `(${value.replace('!',')').split(' ').join('')}`}} </td> <!-- TODO: pass it from back-end -->
          <td v-else>{{ value.replace('None', '') }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import mapPropertyToTitle from '@/lib/mapPropertyToTitle'

export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    mapPropertyToTitle
  }
}
</script>
