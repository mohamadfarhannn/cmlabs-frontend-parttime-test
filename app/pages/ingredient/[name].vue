<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, ref } from 'vue'
import type { MealPreview } from '~/types'

const route = useRoute()
const ingredientName = computed(() => decodeURIComponent(route.params.name as string))

useHead({
  title: () => `Meals with ${ingredientName.value} — Foodie Library`,
  meta: [
    { name: 'description', content: () => `Discover meals you can make with ${ingredientName.value}. Browse recipes with images and step-by-step tutorials.` },
  ],
})

const searchQuery = ref('')

const { data: meals, isLoading, isError, refetch } = useQuery<MealPreview[]>({
  queryKey: ['meals-by-ingredient', ingredientName],
  queryFn: () => getMealsByIngredient(ingredientName.value),
})

const filteredMeals = computed(() => {
  if (!meals.value) return []
  if (!searchQuery.value) return meals.value
  const q = searchQuery.value.toLowerCase()
  return meals.value.filter((meal) =>
    meal.strMeal.toLowerCase().includes(q)
  )
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <AtomsBreadcrumbs
      :items="[
        { label: 'Home', to: '/' },
        { label: 'Ingredients', to: '/' },
        { label: ingredientName }
      ]"
    />

    <MoleculesPageHeader
      :title="ingredientName"
      subtitle="Meals you can make with this ingredient"
    >
      <template #back>
        <AtomsBackButton to="/" label="Back" />
      </template>

      <template #extra>
        <AtomsBadge
          v-if="meals"
          :label="`${filteredMeals.length} meal${filteredMeals.length !== 1 ? 's' : ''}`"
          variant="orange"
        />
      </template>

      <template #search>
        <MoleculesSearchBar
          v-model="searchQuery"
          placeholder="Search meals..."
        />
      </template>
    </MoleculesPageHeader>

    <!-- Loading -->
    <div v-if="isLoading" class="flex justify-center py-20">
      <AtomsLoadingSpinner size="lg" class="text-brand-500" />
    </div>

    <!-- Error -->
    <AtomsErrorState v-else-if="isError" :retry-fn="() => refetch()" />

    <!-- Results -->
    <template v-else>
      <AtomsEmptyState
        v-if="filteredMeals.length === 0"
        message="No meals found for this ingredient."
        icon="lucide:utensils-crossed"
      />
      <OrganismMealGrid v-else :meals="filteredMeals" />
    </template>
  </div>
</template>
