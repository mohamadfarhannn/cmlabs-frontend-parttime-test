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

const { ingredients } = useIngredients()
const searchQuery = ref('')

const ingredient = computed(() => 
  ingredients.value?.find(i => i.strIngredient === ingredientName.value)
)

const ingredientType = computed(() => 
  ingredient.value?.strType || 'Other'
)

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

const router = useRouter()
const comesFromAllIngredients = ref(false)

onMounted(() => {
  // Check if the user navigated here from the /ingredients page
  if (import.meta.client) {
    const back = window.history.state?.back as string | undefined
    if (back === '/ingredients') {
      comesFromAllIngredients.value = true
    }
  }
})

const dynamicBreadcrumbs = computed(() => {
  const middleNode = comesFromAllIngredients.value
    ? { label: 'Ingredients', to: '/ingredients' }
    : { label: ingredientType.value, to: `/type/${encodeURIComponent(ingredientType.value)}` }

  return [
    { label: 'Home', to: '/' },
    middleNode,
    { label: ingredientName.value }
  ]
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <AtomsBreadcrumbs
      :items="dynamicBreadcrumbs"
    />

    <MoleculesPageHeader
      :title="ingredientName"
      subtitle="Meals you can make with this ingredient"
    >
      <template #back>
        <AtomsBackButton label="Back" />
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

    <!-- Error -->
    <AtomsErrorState v-if="isError" :retry-fn="() => refetch()" />

    <!-- Results -->
    <template v-else>
      <AtomsEmptyState
        v-if="!isLoading && filteredMeals.length === 0"
        message="No meals found for this ingredient."
        icon="lucide:utensils-crossed"
      />
      <OrganismMealGrid :meals="filteredMeals" :loading="isLoading" />
    </template>
  </div>
</template>
