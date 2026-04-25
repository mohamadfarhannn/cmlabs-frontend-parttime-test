<script setup lang="ts">
import { computed, ref } from 'vue'

useHead({
  title: 'All Ingredients — Foodie Library',
  meta: [
    { name: 'description', content: 'Browse our complete catalog of ingredients. Find what you need to cook your next meal.' },
  ],
})

const searchQuery = ref('')

// Get all ingredients
const { ingredients, isLoading, isError, refetch } = useIngredients()

// Filter all ingredients by search query
const filteredIngredients = computed(() => {
  if (!ingredients.value) return []
  if (!searchQuery.value) return ingredients.value
  
  const q = searchQuery.value.toLowerCase()
  return ingredients.value.filter((item) =>
    item.strIngredient.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <AtomsBreadcrumbs
      :items="[
        { label: 'Home', to: '/' },
        { label: 'Ingredients' }
      ]"
    />

    <MoleculesPageHeader
      title="All Ingredients"
      subtitle="Explore our complete catalog of food ingredients"
    >
      <template #extra>
        <AtomsBadge
          v-if="ingredients"
          :label="`${filteredIngredients.length} of ${ingredients.length} total ingredient${ingredients.length !== 1 ? 's' : ''}`"
          variant="orange"
        />
      </template>

      <template #search>
        <MoleculesSearchBar
          v-model="searchQuery"
          placeholder="Search all ingredients..."
        />
      </template>
    </MoleculesPageHeader>

    <!-- Error -->
    <AtomsErrorState v-if="isError" :retry-fn="() => refetch()" />

    <!-- Results -->
    <template v-else>
      <AtomsEmptyState
        v-if="!isLoading && filteredIngredients.length === 0"
        message="No ingredients match your search."
      />
      
      <OrganismIngredientGrid 
        :ingredients="filteredIngredients" 
        :loading="isLoading" 
      />
    </template>
  </div>
</template>
