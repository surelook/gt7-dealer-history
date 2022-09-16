<template>
    <div class="occurrence-detail">
        {{state}}
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
    }
</style>    

<script>
export default {
    name: 'OccurenceState',
    props: {
        state: String
    }
}
</script>
