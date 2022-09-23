<template>
    <div class="message">Data provided by <a href="https://ddm999.github.io/gt7info/">GT7 Info</a>. <span class="discrete">Last retrieved at {{date}}</span></div>
</template>

<style scoped>
    .message {
        border-top: 2px solid #1c1e20;
        background-color: #202229;
        padding: 5px 10px;
        position: fixed;
        height: 28px;
        overflow-x: scroll;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 4;
        white-space: nowrap;
    }
</style>

<script>
    import date from '../data/date.json'

    export default {
        name: "DisclosureMessage",
        data() {
            return {
                date: date
            };
        }
    }
</script>