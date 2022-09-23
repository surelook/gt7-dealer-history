import manufactureres from '../data/manufacturers.json'
import { Manufacturer } from './Manufacturer'
export class Car {
    constructor(car) {
        this.id = car.ID
        this.name = car.ShortName
        this.manufacturerId = car.Maker
    }

    get manufacturer () {
        return new Manufacturer(manufactureres.find(manufacturer => manufacturer.ID === this.manufacturerId))
    }
}