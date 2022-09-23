<template>
  <table v-if="cars">
    <thead>
      <tr>
        <th><input v-model="searchTerm" placeholder="Filter" type="text"/></th>
        <th v-for="(date, index) in dates" :key="index">
          <div class="month-label" v-if="date.month">{{date.month}}</div>
          <div class="date-label">{{new Date(date.date).getDate()}}</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(carOccurrences, index) in occurrencesByCarId" :key="index">
        <th>
          <CarDetail :car="getCarById(carOccurrences[0].id)" />
        </th>
        <td v-for="(date, index) in dates" :key="index">
          <OccurenceState :occurrence="getOccurrenceByDate(carOccurrences, date.date)"/>
        </td>
      </tr>
      <tr v-if="occurrencesByCarId.length < 1">
        <th>No results: zero, zip, zilch, nada</th>
        <td v-for="(date, index) in dates" :key="index">
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
  input {
    background-color: #202229;
    outline: none;
    border: none;
    color: #b0b6c4;
    width: 9em;
    padding: 0.2em 0.5em;
    border-radius: 3px;
    font-weight: bold;
  }
  table {
      table-layout: fixed;
      border-collapse: separate;
      border-spacing: 0;
      height: 1px;
  }
  td, th {
      padding: 0px;
      /* border-bottom: 2px solid #1c1e20; */
      background-color: #202024;
      min-width: 1.4em;
  }
  td:nth-child(odd), 
  th:nth-child(odd) {
    background-color: #1c1e20;
  }
  th:first-child {
      border-right: 2px solid #1c1e20;
  }
  tbody tr:hover td,
  tbody tr:hover th {
      border-top: 1px solid hsla(0,0%,100%,.06);
      border-bottom: 1px solid hsla(0,0%,100%,.06);
      background-color: #2a2c2e;
  }
  /* tbody tr:hover td:nth-child(odd), 
  tbody tr:hover th:nth-child(odd) {
    background-color: #1F2123;
  } */
  tbody th {
      position: -webkit-sticky;
      position: sticky;
      left: 0;
      z-index: 1;
      text-align: left;
  }

  tbody th:has(.hover) {
    z-index: 2;
  }

  thead tr {
      position: -webkit-sticky;
      position: sticky;
      top: 0;
      z-index: 2;
  }

  thead th {
      white-space: nowrap;
      padding-top: 1.5em;
  }
  
  thead th:has(.month-label) {
    position: relative;
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

  .date-label {
    width: 3em;
  }

  .month-label {
    position: absolute;
    color: #686a70;
    font-weight: bold;
    left: 1.5em;
    top: 0.5em;
    font-size: 0.8em;
  }
</style>

<script>
import cars from '../data/cars.json'
import occurrences from '../data/occurrences.json'
import manufacturers from '../data/manufacturers.json'
import OccurenceState from './OccurenceState.vue'
import CarDetail from './CarDetail.vue'
import { Car } from '../model/Car'

const monthNames = [
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

export default {
  name: 'HistoryTable',
  components: {
    OccurenceState,
    CarDetail
  },
  data(){
      return {
          cars: cars.map(car => new Car(car)),
          occurrences: occurrences,
          searchTerm: ''
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
        },[]).filter((row) => {
          if (!this.searchTerm) {
            return true
          }
          
          const car = this.getCarById(row[0].id)
          const manufacturer = this.getManufacturerById(car.Maker)
          return `${manufacturer.Name.toLowerCase()} ${car.ShortName.toLowerCase()}`.includes(this.searchTerm.toLowerCase())
        });
      },
    dates() {
      let dates = []

      for (let [index, occurrence] of occurrences.entries()) {
        let existing = dates.find(entry => entry.date === occurrence.date)

        if (existing) {
          continue
        }

        let newEntry = {
          date: occurrence.date
        }

        if (index < 1 || new Date(occurrence.date).getMonth() !== new Date(occurrences[index - 1].date).getMonth()) {
          newEntry.month = monthNames[new Date(occurrence.date).getMonth() - 1]
        }

        dates.push(newEntry)
      }

      return dates
    }
  },
  methods: {
    getCarById(id) {
      return cars.find(car => car.ID === id)
    },
    getOccurrenceByDate(occurrences, date) {
      return occurrences.find(occurrence => occurrence.date === date)
    },
    getManufacturerById(id) {
        return manufacturers.find(manufacturer => manufacturer.ID === id)
    }
  }
}
</script>
