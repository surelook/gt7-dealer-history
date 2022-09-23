// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        baseURL: process.env.BASE_URL
    },
    head: {
        title: 'GT7 Dealer History',
    },
    publicRuntimeConfig: {
        gaTrackingId: process.env.GA_TRACKING_ID
    },
    target: 'static',
    experimental: {
        payloadExtraction: false
    }
})
