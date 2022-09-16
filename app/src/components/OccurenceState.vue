<template>
    <div 
        @mouseover="hover=true"
        @mouseleave="hover=false" 
        :class="['state', state]">
        <div v-html="icon"></div>
        <OccurenceDetail v-if="hover" :state="state" />
    </div>
</template>

<style scoped>
    .state {
        cursor: default;
    }

    .normal {
        color: red;
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
import OccurenceDetail from "./OccurenceDetail.vue";
export default {
    name: "OccurenceState",
    props: {
        state: String
    },
    data() {
        return {
            hover: false
        };
    },
    computed: {
        icon() {
            switch (this.state) {
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
            switch (this.state) {
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
