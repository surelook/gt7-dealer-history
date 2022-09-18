<template>
  <HistoryTable />
</template>

<script>
import HistoryTable from './components/HistoryTable.vue'

export default {
  name: 'App',
  components: {
    HistoryTable
  }
}
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    font-family: "Helvetica Neue", "sans-serif";
    font-size: .874rem;
    background-color: #1c1e20;
    min-height: 100vh;
    color: #b0b6c4;
}
a {
    color: #45b0ff;
}
.discrete {
    color: #686a70;
}
.message {
    border-top: 2px solid #1c1e20;
    background-color: #202229;
    padding: 5px 10px;
    position: -webkit-sticky;
    position: sticky;
    bottom: 0;
    z-index: 4;
}
</style>
