<template>
    <div ref="root" :class="['occurrence-detail', {left, top}]">
        <div :class="[occurrence.state]">{{label}}</div>
        <div>{{credits}}</div>
        <div class="date">{{date}}</div>
    </div>
</template>

<style scoped>
    .occurrence-detail {
        position: absolute;
        background-color: #202024;
        left: calc(100% + 2px);
        top: -1px;
        width: 200px;
        padding: 1em;
        color: #b0b6c4;
        border-radius: 5px;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);
        border: 1px solid hsla(0,0%,100%,.08);
        text-align: left;
        line-height: 1.4;
        z-index: 2;
        pointer-events: none;
    }

    .left {
        left: auto;
        right: calc(100% + 2px);
    }

    .top {
        top: auto;
        bottom: -1px;
    }

    .date {
        color: #686a70;
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
    data() {
        return {
            left: false,
            top: false
        }
    },
    mounted() {
        const boundingRect = this.$refs.root.getBoundingClientRect()
        this.left = boundingRect.right > window.innerWidth - 10
        this.top = boundingRect.bottom > window.innerHeight - 38
    },
    computed: {
        credits() {
            return `${this.occurrence.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} cr`
        },
        date() {
            return new Date(this.occurrence.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
        }
    }
}
</script>
