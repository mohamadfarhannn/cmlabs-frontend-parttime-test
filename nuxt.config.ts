// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/icon'],

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@tanstack/vue-query',
      ]
    }
  },

  tailwindcss: {
    exposeConfig: true, 
    viewer: true,
  },

  css: [
    '~/assets/css/main.css',
  ],

  devtools: { enabled: true },
})
