// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/tailwindcss', '@vueuse/nuxt', '@nuxt/icon'],

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Foodie Library — Explore Ingredients & Meals',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Discover ingredients, explore meal recipes, and watch cooking tutorials — powered by TheMealDB API.',
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'icon',
          type: 'image/webp',
          href: '/favicon.ico.webp',
        },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

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
