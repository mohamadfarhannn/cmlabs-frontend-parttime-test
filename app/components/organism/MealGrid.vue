<script setup lang="ts">
import type { MealPreview } from '~/types'

defineProps<{
  meals: MealPreview[]
  loading?: boolean
}>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
    <template v-if="loading">
      <AtomsMealCard v-for="n in 8" :key="'skeleton-' + n" loading />
    </template>
    <template v-else>
      <AtomsMealCard
        v-for="(meal, index) in meals"
        :key="meal.idMeal"
        :id="meal.idMeal"
        :name="meal.strMeal"
        :thumbnail="meal.strMealThumb"
        class="animate-fade-in-up"
        :style="{ animationDelay: `${index * 40}ms` }"
      />
    </template>
  </div>
</template>
