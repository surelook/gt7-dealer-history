<template>
    <div class="occurrence-detail">
        <div :class="['state-label',  occurrence.state]" ><span v-html="icon"></span> {{label}}</div>
        <div>{{credits}}</div>
    </div>
</template>

<style scoped>
    .occurrence-detail {
        position: absolute;
        background-color: #202024;
        padding: 1em;
        color: #b0b6c4;
        border-radius: 5px;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);
        border: 1px solid hsla(0,0%,100%,.08);
        text-align: left;
        line-height: 1.4;
    }

    .state-label {
        color: pink;
    }
    
    .soldout {
        color: #a12a34;
    }

    .normal {
        color: #45b0ff;
    }

    .limited {
        color: #f3f629;
    }
    
    .new {
        color: #95b217;
    }
</style>    

<script>
export default {
    name: 'OccurenceState',
    props: {
        occurrence: Object,
        label: String,
        icon: String
    },
    computed: {
        credits() {
            return `${this.occurrence.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} cr`
        }
    }
}
</script>
