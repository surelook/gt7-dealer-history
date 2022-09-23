<template>
    <div @mouseenter="hover = true" @mouseleave="hover = false"  :class="['car-detail', {hover: hover}]">
        <strong class="manufacturer-label"><small>{{manufacturer.Name}}</small></strong>
        <div class="car-label">{{car.ShortName}}</div>
        <div v-if="hover" class="expanded">
            <strong class="manufacturer-label"><small>{{manufacturer.Name}}</small></strong>
            <div class="car-label">{{car.ShortName}}</div>
        </div>
    </div>
</template>

<style scoped>
    .car-detail {
        padding: 0.5em;
        width: 9em;
        position: relative;
    }
    .car-detail.hover {
        z-index: 100;
    }
    .manufacturer-label {
        color: #686a70;
    }
    .car-label {
        height: 1.4em;
        min-height: 1.4em;
        overflow: hidden;
    }
    .expanded {
        padding: 0.5em;
        border-radius: 5px;
        background-color: #202024;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);
        border: 1px solid hsla(0,0%,100%,.08);
        /* pointer-events: none; */
        position: absolute;
        z-index: 10;
        top: -1px;
        left: -1px;
        right: -1px;
    }

    .expanded .car-label {
        height: auto;
    }
</style>    

<script>
import manufacturers from '../data/manufacturers.json'

export default {
    name: 'CarDetail',
    props: {
        car: Object
    },
    data() {
        return {
            hover: false
        }
    },
    computed: {
        manufacturer() {
            return manufacturers.find(manufacturer => manufacturer.ID === this.car.Maker)
        }
    }
}
</script>
