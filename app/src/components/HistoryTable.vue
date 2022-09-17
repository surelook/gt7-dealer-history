<template>
  <table v-if="cars">
    <thead>
      <tr>
        <th></th>
        <th v-for="(date, index) in dates" :key="index">
          {{new Date(date).getDate()}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(carOccurrences, index) in occurrencesByCarId" :key="index">
        <th>
          <CarDetail :car="getCarById(carOccurrences[0].id)" />
        </th>
        <td v-for="(date, index) in dates" :key="index">
          <OccurenceState v-if="getOccurrenceByDate(carOccurrences, date)" :occurrence="getOccurrenceByDate(carOccurrences, date)"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  table {
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;
      height: 1px;
  }
  td, th {
      padding: 0px;
      border-bottom: 2px solid #1c1e20;
      background-color: #202024;
      min-width: 1.4em;
  }
  th:first-child {
      border-right: 2px solid #1c1e20;
  }
  tr:hover td,
  tr:hover th {
      background-color: #202229;
  }
  tbody th {
      position: -webkit-sticky;
      position: sticky;
      left: 0;
      z-index: 1;
      text-align: left;
  }
  thead tr {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 2;
  }
  thead th {
      white-space: nowrap;
  }
  thead th:first-child {
      position: sticky;
      top: 0;
      left: 0;
      z-index: 3;
  }
  tbody td {
      text-align: center;
  }
</style>

<script>
import cars from '../../data/cars.json'
import occurrences from '../../data/occurrences.json'
import OccurenceState from './OccurenceState.vue'
import CarDetail from './CarDetail.vue'

export default {
  name: 'HistoryTable',
  components: {
    OccurenceState,
    CarDetail
  },
  data(){
      return {
          cars: [cars[0]],
          occurrences: occurrences
      }
  },
  computed: {
    occurrencesByCarId() {
        return this.occurrences.reduce((acc, curr) => {
          let pointer = acc.find(occurence => occurence[0].id === curr.id)
          if (!pointer) {
              acc.push([curr])
          } else {
              pointer.push(curr);
          }
          return acc;
        },[]);
      },
    dates() {
      let datesSet = new Set()
      for (let occurrence of occurrences) {
        datesSet.add(occurrence.date)
      }

      return datesSet
    }
  },
  methods: {
    getCarById(id) {
      return cars.find(car => car.ID === id)
    },
    getOccurrenceByDate(occurrences, date) {
      return occurrences.find(occurrence => occurrence.date === date)
    }
  }
}
</script>
