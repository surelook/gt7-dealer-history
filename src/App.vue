<template>
  <HistoryTable />
  <DisclosureMessage />
</template>

<script>
import DisclosureMessage from './components/DisclosureMessage.vue'
import HistoryTable from './components/HistoryTable.vue'
import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

export default {
  name: 'App',
  components: {
    DisclosureMessage,
    HistoryTable
  },
  mounted() {
    if (process.env.GA_TRACKING_ID) {
    const analytics = Analytics({
        app: document.title,
        plugins: [
          googleAnalytics({
            trackingId: process.env.GA_TRACKING_ID
          })
        ]
      })

    analytics.page()
    }
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
    margin-bottom: 28px;
}
a {
    color: #45b0ff;
}
.discrete {
    color: #686a70;
}
</style>
