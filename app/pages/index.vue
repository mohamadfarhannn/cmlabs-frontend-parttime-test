<script setup lang="ts">
import { computed, ref } from 'vue'

useHead({
  title: 'Foodie Library — Explore Ingredients by Category',
  meta: [
    { name: 'description', content: 'Browse ingredient categories like Dressing, Seasoning, Vinegar and more. Discover meals and recipes from TheMealDB.' },
  ],
})

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
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient text-white py-16 sm:py-24 px-4 relative overflow-hidden">
      <!-- Decorative blurred circles -->
      <div class="absolute top-10 -left-20 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div class="max-w-6xl mx-auto relative z-10 text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6">
          <Icon name="lucide:sparkles" class="w-4 h-4 text-brand-400" />
          <span class="text-gray-200">{{ totalCount }} ingredients available</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          Foodie <span class="text-brand-400">Library</span>
        </h1>
        <p class="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Explore ingredient categories, discover meals, and learn recipes from around the world.
        </p>

        <!-- Search -->
        <div class="max-w-lg mx-auto">
          <MoleculesSearchBar
            v-model="searchQuery"
            placeholder="Search categories..."
          />
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <!-- Loading -->
      <div v-if="isLoading" class="flex justify-center py-20">
        <AtomsLoadingSpinner size="lg" class="text-brand-500" />
      </div>

      <!-- Error -->
      <AtomsErrorState v-else-if="isError" :retry-fn="() => refetch()" />

      <!-- Results -->
      <template v-else>
        <AtomsEmptyState
          v-if="filteredTypes.length === 0"
          message="No categories match your search."
        />
        <OrganismTypeCategoryGrid v-else :types="filteredTypes" />
      </template>
    </section>
  </div>
</template>