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
table {
    table-layout: fixed;
    border-collapse: separate; /* Don't collapse */
    border-spacing: 0;
}
td, th {
    padding: 5px;
    border-bottom: 2px solid #1c1e20;
    background-color: #202024;
    min-width: 1.4em;
}
th:first-child {
    border-right: 2px solid #1c1e20;
}
tr:hover td,
tr:hover th {
    background-color: #202229;
}
tbody th {
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    z-index: 1;
    text-align: left;
    padding: 5px 10px;
}
thead tr {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
}
thead th {
    padding-top: 1em;
    white-space: nowrap;
}
thead th:first-child {
    position: sticky;
    top: 0;
    left: 0;
    z-index: 3;
}
tbody td {
    text-align: center;
}
.month-label {
    position: absolute;
    transform: translateY(-1.1em);
    font-size: 0.8em;
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
.manufacturer-label {
    color: #686a70;
}
.car-label {
    height: 2.4em;
    overflow: hidden;
}
</style>
