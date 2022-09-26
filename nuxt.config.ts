// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    app: {
        baseURL: process.env.BASE_URL
    },
    meta: {
        title: 'GT7 Dealer History',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { name: 'description', content: 'Historical availability of GT7 Legendary Dealership cars - surelook' }
        ]
    },
    publicRuntimeConfig: {
        gaTrackingId: process.env.GA_TRACKING_ID
    },
    target: 'static',
    experimental: {
        payloadExtraction: false
    }
})
