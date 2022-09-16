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
      <tr v-for="(carOccurrences, index) in occurrencesByCarId()" :key="index">
        <th>
          {{getManufacturerById(getCarById(index).Maker).Name}}
          {{getCarById(index).ShortName}}</th>
        <td v-for="(date, index) in dates" :key="index">
          {{getStateByDate(carOccurrences, date)}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import cars from '../../data/cars.json'
import manufacturers from '../../data/manufacturers.json'
import occurrences from '../../data/occurrences.json'

const datesSet = new Set()

for (let occurrence of occurrences) {
  datesSet.add(occurrence.date)
}

export default {
  name: 'HistoryTable',
  data(){
      return {
          cars: [cars[0]],
          manufacturers: manufacturers,
          occurrences: occurrences,
          dates: datesSet,
          occurrencesByCarId: () => {
            return occurrences.reduce((acc, curr) => {
                if(!acc[curr.id]) acc[curr.id] = [];
                acc[curr.id].push(curr);
                return acc;
            },{});
          }
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
