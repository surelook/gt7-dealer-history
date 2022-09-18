<template>
    <div 
        v-if="occurrence"
        @mouseover="hover=true"
        @mouseleave="hover=false" 
        :class="['occurrence-state', occurrence.state]">
        <div v-html="icon"></div>
        <OccurenceDetail v-if="hover" :occurrence="occurrence" :label="label" :icon="icon" />
    </div>
    <div class="occurrence-state empty" v-else></div>
</template>

<style scoped>
    .occurrence-state {
        cursor: default;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 3em;
        height: 100%;
    }

    .occurrence-state:not(.empty):hover {
        border-radius: 5px;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);
        border: 1px solid hsla(0,0%,100%,.08);
        background-color: #202024;
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
import OccurenceDetail from "./OccurenceDetail";
export default {
    name: "OccurenceState",
    props: {
        occurrence: Object
    },
    data() {
        return {
            hover: false
        };
    },
    computed: {
        icon() {
            switch (this.occurrence.state) {
                default:
                    return;
                case "limited":
                    return "&#9888;";
                case "soldout":
                    return "&#10006;";
                case "normal":
                    return "&check;";
                case "new":
                    return "&starf;";
            }
        },
        label() {
            switch (this.occurrence.state) {
                default:
                    return;
                case "limited":
                    return "Limited Stock";
                case "soldout":
                    return "Sold Out";
                case "normal":
                    return "In Stock";
                case "new":
                    return "New";
            }
        }
    },
    components: { OccurenceDetail }
}
</script>
