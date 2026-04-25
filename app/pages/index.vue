<script setup lang="ts">
import { computed, ref } from 'vue'

useHead({
  title: 'Foodie Library — Explore Ingredients by Category',
  meta: [
    { name: 'description', content: 'Browse ingredient categories like Dressing, Seasoning, Vinegar and more. Discover meals and recipes from TheMealDB.' },
  ],
})

import { useTransition, TransitionPresets } from '@vueuse/core'

const searchQuery = ref('')

const { types, isLoading, isError, refetch } = useIngredients()

// Filter types by search query
const filteredTypes = computed(() => {
  if (!searchQuery.value) return types.value
  const q = searchQuery.value.toLowerCase()
  return types.value.filter((t) =>
    t.name.toLowerCase().includes(q)
  )
})

// Total ingredient count
const totalCount = computed(() =>
  types.value.reduce((sum, t) => sum + t.count, 0)
)

// Animated count logic
const count = ref(0)
const displayCount = useTransition(count, {
  duration: 2000,
  transition: TransitionPresets.easeOutExpo,
})

watch(totalCount, (newVal) => {
  count.value = newVal
}, { immediate: true })

const scrollToContent = () => {
  const el = document.getElementById('explore')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  count.value = 0
  setTimeout(() => {
    count.value = totalCount.value
  }, 100)
}
</script>

<template>
  <div class="w-full">
    <!-- Hero Section -->
    <section class="relative h-[80vh] min-h-screen flex items-center overflow-hidden">
      <!-- Background Image with Overlay -->
      <div class="absolute inset-0 z-0">
        <img 
          src="/hero.webp" 
          alt="Healthy food bowl" 
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div class="max-w-xl">
          <h1 class="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white leading-[1.1] mb-6">
            Easy Home<br />Cooking
          </h1>
          <p class="text-white/90 text-lg sm:text-xl md:text-3xl mb-10 max-w-md">
            Find various recipes from {{ Math.round(displayCount) }}+ available ingredients
          </p>

          <button 
            @click="scrollToContent"
            class="inline-flex items-center justify-center px-8 py-3.5 bg-[#00AD96] hover:bg-[#009682] text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-[#00AD96]/30 transform hover:-translate-y-1 uppercase tracking-wider text-sm"
          >
            Let's find out!
          </button>
        </div>
      </div>
    </section>

    <!-- Content Section Wrapper for Full-Width Background -->
    <div id="explore" class="body-gradient w-full overflow-hidden">
      
      <!-- Content Container for Max-Width Alignment -->
      <section class="max-w-6xl mx-auto px-4 sm:px-6 py-10 relative min-h-screen">
        
        <!-- Top Right Ornament -->
        <img src="/asset1.webp" alt="Vegetables ornament" class="absolute top-36 right-0 w-2/3 md:w-1/2 xl:w-auto xl:max-w-2xl pointer-events-none -mr-10 sm:-mr-20 -mt-10 sm:-mt-20 z-0 object-contain drop-shadow-2xl opacity-90" />

        <div class="relative z-10 flex flex-col md:justify-between items-start gap-4 mb-10 mt-10 md:mt-24">
          <h2 class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#111111] leading-[1.1] max-w-lg tracking-tight">
            Explore {{ Math.round(displayCount) }}+ Ingredients, <br/>Around The World.
          </h2>

          <div class="w-full md:w-auto mt-4 md:mt-0 relative z-20">
            <MoleculesSearchBar
              v-model="searchQuery"
              placeholder="Search Ingredients..."
            />
          </div>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="flex justify-center py-20 relative z-10">
          <AtomsLoadingSpinner size="lg" class="text-brand-500" />
        </div>

        <!-- Error -->
        <AtomsErrorState v-else-if="isError" :retry-fn="() => refetch()" class="relative z-10" />

        <!-- Results -->
        <template v-else>
          <AtomsEmptyState
            v-if="filteredTypes.length === 0"
            message="No categories match your search."
            class="relative z-10"
          />
          <div class="relative z-10">
            <OrganismTypeCategoryGrid :types="filteredTypes" />
          </div>
        </template>
      </section>
    </div>
  </div>
</template>