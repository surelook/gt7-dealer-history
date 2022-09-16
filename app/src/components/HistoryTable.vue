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
          <strong class="manufacturer-label"><small>{{getManufacturerById(getCarById(carOccurrences[0].id).Maker).Name}}</small></strong><br />
          {{getCarById(carOccurrences[0].id).ShortName}}
        </th>
        <td v-for="(date, index) in dates" :key="index">
          <OccurenceState :state="getStateByDate(carOccurrences, date)"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import cars from '../../data/cars.json'
import manufacturers from '../../data/manufacturers.json'
import occurrences from '../../data/occurrences.json'
import OccurenceState from './OccurenceState'

const datesSet = new Set()

for (let occurrence of occurrences) {
  datesSet.add(occurrence.date)
}

export default {
  name: 'HistoryTable',
  components: {
    OccurenceState
  },
  data(){
      return {
          cars: [cars[0]],
          manufacturers: manufacturers,
          occurrences: occurrences,
          dates: datesSet
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
      }
  },
  methods: {
    getCarById(id) {
      return cars.find(car => car.ID === id)
    },
    getManufacturerById(id) {
      return manufacturers.find(manufacturer => manufacturer.ID === id)
    },
    getOccurrenceByDate(occurrences, date) {
      return occurrences.find(occurrence => occurrence.date === date)
    },
    getStateByDate(occurrences, date) {
      const occurrence = this.getOccurrenceByDate(occurrences, date)
      if (occurrence) return occurrence.state
    }
  }
}
</script>
