import { VueQueryPlugin, QueryClient, hydrate, dehydrate } from '@tanstack/vue-query'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: { 
      queries: { 
        staleTime: 1000 * 60 * 5, // 5 menit cache
      } 
    },
  })

  nuxtApp.vueApp.use(VueQueryPlugin, { queryClient })

  // Gunakan import.meta agar TypeScript tidak marah
  if (import.meta.server) {
    nuxtApp.hooks.hook('app:rendered', () => {
      nuxtApp.payload.vueQueryState = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    nuxtApp.hooks.hook('app:created', () => {
      hydrate(queryClient, nuxtApp.payload.vueQueryState)
    })
  }
})