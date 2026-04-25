<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Ingredient } from '~/types'

const route = useRoute()
const typeName = computed(() => decodeURIComponent(route.params.type as string))

useHead({
  title: () => `${typeName.value} Ingredients — Foodie Library`,
  meta: [
    { name: 'description', content: () => `Browse all ${typeName.value} ingredients. Click any ingredient to see related meals and recipes.` },
  ],
})

const searchQuery = ref('')

const { isLoading, isError, refetch, getIngredientsByType } = useIngredients()

// Get ingredients for this type
const ingredients = computed<Ingredient[]>(() =>
  getIngredientsByType(typeName.value)
)

// Filter by search
const filteredIngredients = computed(() => {
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
        { label: typeName }
      ]"
    />

    <MoleculesPageHeader
      :title="typeName"
      :subtitle="`Explore all ingredients in the ${typeName} category`"
    >
      <template #back>
        <AtomsBackButton to="/" label="All Categories" />
      </template>

      <template #extra>
        <AtomsBadge
          :label="`${filteredIngredients.length} of ${ingredients.length} ingredient${ingredients.length !== 1 ? 's' : ''}`"
          variant="orange"
        />
      </template>

      <template #search>
        <MoleculesSearchBar
          v-model="searchQuery"
          placeholder="Search ingredients..."
        />
      </template>
    </MoleculesPageHeader>

    <!-- Error -->
    <AtomsErrorState v-if="isError" :retry-fn="() => refetch()" />

    <!-- Results -->
    <template v-else>
      <AtomsEmptyState
        v-if="!isLoading && filteredIngredients.length === 0"
        message="No ingredients match your search in this category."
      />
      <OrganismIngredientGrid :ingredients="filteredIngredients" :loading="isLoading" />
    </template>
  </div>
</template>
